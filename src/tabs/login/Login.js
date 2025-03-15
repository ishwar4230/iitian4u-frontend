import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import { Button, TextInput, PasswordInput, Card, Group, Loader } from "@mantine/core";
import axios from "axios";
import config from "../../Config";
import { notifications } from "@mantine/notifications";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // OTP state
  const [otpSent, setOtpSent] = useState(false); // OTP sent status
  const [otpTimer, setOtpTimer] = useState(0); // OTP cooldown timer
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const API_PREFIX = config.API_PREFIX;
  const navigate = useNavigate();

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleLogin = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await axios.post(`${API_PREFIX}/api/auth/login`, { phone: mobile, password }, { withCredentials: true });
      dispatch(login(res.data.user.id)); // Store user ID in Redux

      // Retrieve the intended path from session storage
      const from = sessionStorage.getItem("from") || "/";
      sessionStorage.removeItem("from"); // Clear the stored path

      navigate(from, { replace: true }); // Navigate to the intended path
      notifications.show({
        title: "Success!",
        message: "Logged in successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error!",
        message: `Error while logging in ${error.response?.data?.message}`,
        color: "red",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSignup = async () => {
    if (!otp) {
      notifications.show({ title: "Error!", message: "Please enter OTP", color: "red" });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${API_PREFIX}/api/auth/register`, { name, email, phone: mobile, password, otp });
      setIsSignup(false);
      notifications.show({ title: "Success!", message: "Signed up successfully! Login now.", color: "green" });
    } catch (error) {
      notifications.show({
        title: "Error!",
        message: `Error while signing up ${error.response?.data?.message}`,
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetOtp = async () => {
    try {
      await axios.post(`${API_PREFIX}/api/auth/get-otp`, { email });
      setOtpSent(true);
      setOtpTimer(60);
      notifications.show({
        title: "OTP Sent!",
        message: "Check your inbox or spam folder.",
        color: "blue",
      });
    } catch (error) {
      notifications.show({
        title: "Error!",
        message: `Failed to send OTP: ${error.response?.data?.message}`,
        color: "red",
      });
    }
  };

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 400, margin: "auto", marginTop: "50px" }}>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>

      {isSignup && (
        <>
          <TextInput label="Name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextInput label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required mt="md" />
        </>
      )}

      {isSignup && (
        <Button fullWidth mt="sm" onClick={handleGetOtp} disabled={otpTimer > 0}>
          {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Get OTP"}
        </Button>
      )}

      {isSignup && otpSent && (
        <TextInput label="Enter OTP" placeholder="Enter received OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required mt="md" />
      )}

      <TextInput label="Mobile" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} required mt="md" />
      <PasswordInput label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required mt="md" />

      <Button color="blue" fullWidth mt="md" onClick={isSignup ? handleSignup : handleLogin} disabled={isLoading}>
        {isLoading ? <Loader size="xs" color="white" /> : isSignup ? "Sign Up" : "Login"}
      </Button>

      <Group position="center" mt="md">
        <Button variant="subtle" onClick={() => setIsSignup(!isSignup)} disabled={isLoading}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </Button>
      </Group>
    </Card>
  );
};

export default Login;