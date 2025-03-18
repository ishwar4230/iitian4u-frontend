import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Text, Button, Stack, Loader, Center, Divider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
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
        showNotification({ title: "Error", message: `Failed to fetch price: ${error}`, color: "red" });
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
      showNotification({ title: "Error", message: `Payment initiation failed: ${error}`, color: "red" });
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
    <Center style={{ height: "100vh" }}>
      <Card
        shadow="xl"
        padding="xl"
        radius="lg"
        withBorder
        style={{
          maxWidth: 450,
          width: "100%",
          background: "linear-gradient(to right, #ffffff, #f8f9fa)",
        }}
      >
        <Stack spacing="lg" align="center">
          <Text size="xl" fw={800} c="blue" transform="uppercase">
            Checkout
          </Text>

          <Divider style={{ width: "100%" }} />

          <Text fw={600} size="md" transform="uppercase" c="gray">
            Course Type: <Text span fw={700} c="black">{courseType.replace(/_/g, " ").toUpperCase()}</Text>
          </Text>

          <Text fw={600} size="md" transform="uppercase" c="gray">
            Course Name: <Text span fw={700} c="black">{courseName.replace(/_/g, " ").toUpperCase()}</Text>
          </Text>

          <Text fw={600} size="md" transform="uppercase" c="gray">
            Plan Type: <Text span fw={700} c="black">{planType.replace(/_/g, " ").toUpperCase()}</Text>
          </Text>

          <Divider style={{ width: "100%" }} />

          <Text size="2xl" fw={800} c="green">
            Price: ₹{price}
          </Text>

          <Button
            fullWidth
            size="lg"
            radius="xl"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            variant="gradient"
            onClick={handlePayment}
            disabled={isPaying}
          >
            {isPaying ? <Loader size="sm" color="white" /> : "Buy Now"}
          </Button>
        </Stack>
      </Card>
    </Center>
  );
};

export default Checkout;