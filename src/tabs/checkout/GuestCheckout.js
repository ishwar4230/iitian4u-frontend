import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Text, TextInput, Button, Stack, Loader, Center, Divider, Image } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import config from "../../Config";

const GuestCheckout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", email: "" });

  const courseType = searchParams.get("course_type");
  const courseName = searchParams.get("course_name");
  const planType = searchParams.get("plan_type");

  useEffect(() => {
    if (!courseType || !courseName || !planType) navigate("/");
    const fetchPrice = async () => {
      try {
        const res = await axios.get(`${config.API_PREFIX}/price/get-checkout-price`, {
          params: { course_type: courseType, course_name: courseName, plan_type: planType },
        });
        setPrice(res.data.price);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPrice();
  }, [courseType, courseName, planType, navigate]);

  const handlePayment = async () => {
    const { name, mobile } = form;
    if (!name || !mobile) return alert("Name and Mobile number are required");
    setIsPaying(true);
    try {
      const { data } = await axios.post(`${config.API_PREFIX}/guestPayment/create-order`, { amount: price });
      const options = {
        key: data.key,
        amount: price * 100,
        currency: "INR",
        name: "IITIANS4U",
        description: "Course Plan Purchase",
        order_id: data.order_id,
        image: "https://cdn.razorpay.com/logo.svg",
        handler: async function (response) {
          const verifyRes = await axios.post(`${config.API_PREFIX}/guestPayment/verify-payment`, {
            ...form,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: price,
            courseType,
            courseName,
            planType,
          });

          if (verifyRes.data.success) {
            navigate("/thank-you");
          } else {
            alert("Payment verification failed");
          }
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      showNotification({ title: "Error", message: "Payment initiation failed", color: "red" });
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) return <Center style={{ height: "100vh" }}><Loader size="lg" /></Center>;

  return (
    <Center style={{ height: "100vh" }}>
      <Card shadow="xl" padding="xl" radius="lg" withBorder style={{ maxWidth: 500, width: "100%" }}>
        <Stack spacing="lg">
          <Image src="https://cdn.razorpay.com/logo.svg" width={150} mx="auto" />
          <Text size="xl" fw={700} ta="center">Checkout as Guest</Text>
          <Divider />

          <TextInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <TextInput label="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} required />
          <TextInput label="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <Divider />
          <Text fw={600}>Price: ₹{price}</Text>
          <Button fullWidth onClick={handlePayment} disabled={isPaying}>
            {isPaying ? <Loader size="sm" color="white" /> : "Pay Now"}
          </Button>
        </Stack>
      </Card>
    </Center>
  );
};

export default GuestCheckout;