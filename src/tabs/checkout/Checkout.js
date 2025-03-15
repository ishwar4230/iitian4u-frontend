import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Text, Button, Stack, Loader, Center } from "@mantine/core";
import axios from "axios";
import config from "../../Config";
const Checkout = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPaying, setIsPaying] = useState(false);

    const courseType = searchParams.get("course_type");
    const courseName = searchParams.get("course_name");
    const planType = searchParams.get("plan_type");

    // Redirect if any parameter is missing
    useEffect(() => {
        if (!courseType || !courseName || !planType) {
            navigate("/");
            return;
        }

        // Fetch price from API
        const fetchPrice = async () => {
            try {
                const response = await axios.get(
                    `${config.API_PREFIX}/price/get-checkout-price?course_type=${courseType}&course_name=${courseName}&plan_type=${planType}`,
                    { withCredentials: true }
                );
                setPrice(response.data.price);
            } catch (error) {
                console.error("Failed to fetch price:", error);
                navigate("/"); // Redirect on failure
            } finally {
                setLoading(false);
            }
        };

        fetchPrice();
    }, [courseType, courseName, planType, navigate]);

    const handlePayment = async () => {
        setIsPaying(true);
        try {
            const response = await axios.post(
                `${config.API_PREFIX}/payment/create-order`,
                { amount: price },
                { withCredentials: true }
            );

            const { order_id, key } = response.data;

            const options = {
                key,
                amount: price * 100,
                currency: "INR",
                name: "IITIANS4U",
                description: "Course Plan Purchase",
                order_id,
                handler: async function (response) {
                    // Verify payment on backend
                    const verifyRes = await axios.post(
                        `${config.API_PREFIX}/payment/verify-payment`,
                        {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            courseType,
                            courseName,
                            planType,
                            amount: price
                        },
                        { withCredentials: true }
                    );

                    if (verifyRes.data.success) {
                        navigate(`/thank-you?course_type=${courseType}&course_name=${courseName}&plan_type=${planType}`);
                    } else {
                        alert("Payment verification failed!");
                    }
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment initiation failed:", error);
        } finally {
            setIsPaying(false);
        }
    };

    if (loading) {
        return (
            <Center style={{ height: "100vh" }}>
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
            <Stack>
                <Text size="lg" fw={700} style={{ textTransform: "uppercase" }}>
                    Checkout
                </Text>
                <Text fw={500} style={{ textTransform: "uppercase" }}>
                    Course Type: {courseType}
                </Text>
                <Text fw={500} style={{ textTransform: "uppercase" }}>
                    Course Name: {courseName}
                </Text>
                <Text fw={500} style={{ textTransform: "uppercase" }}>
                    Plan Type: {planType}
                </Text>
                <Text size="xl" fw={700} style={{ textTransform: "uppercase" }}>
                    Price: ₹{price}
                </Text>
                <Button fullWidth color="blue" size="md" onClick={handlePayment} disabled={isPaying}>
                    {isPaying ? <Loader size="sm" color="white" /> : "Buy Now"}
                </Button>
            </Stack>
        </Card>

    );
};

export default Checkout;

//navigate(`/checkout?course_type=${courseType}&course_name=${courseName}&plan_type=${planType}&price=${price}`);

