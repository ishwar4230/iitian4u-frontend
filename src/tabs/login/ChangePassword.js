import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, PasswordInput, Card, Loader } from "@mantine/core";
import axios from "axios";
import config from "../../Config";
import { notifications } from "@mantine/notifications";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const API_PREFIX = config.API_PREFIX;
  const navigate = useNavigate();

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleGetOtp = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${API_PREFIX}/api/auth/get-otp`, { email });
      setOtpSent(true);
      setOtpTimer(60);
      notifications.show({ title: "OTP Sent!", message: "Check your email inbox or spam folder.", color: "blue" });
    } catch (error) {
      notifications.show({ title: "Error!", message: error.response?.data?.message || "Failed to send OTP", color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!otp || !newPassword) {
      notifications.show({ title: "Error!", message: "Please enter OTP and new password", color: "red" });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${API_PREFIX}/api/auth/change-password`, { email, otp, newPassword });
      notifications.show({ title: "Success!", message: "Password changed successfully! Login now.", color: "green" });
      navigate("/login");
    } catch (error) {
      notifications.show({ title: "Error!", message: error.response?.data?.message || "Failed to change password", color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 400, margin: "auto", marginTop: "50px" }}>
      <h2>Reset Password</h2>

      <TextInput label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <Button fullWidth mt="sm" onClick={handleGetOtp} disabled={otpTimer > 0 || isLoading}>
        {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Get OTP"}
      </Button>

      {otpSent && (
        <>
          <TextInput label="Enter OTP" placeholder="Enter received OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required mt="md" />
          <PasswordInput label="New Password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required mt="md" />
          <Button color="blue" fullWidth mt="md" onClick={handleChangePassword} disabled={isLoading}>
            {isLoading ? <Loader size="xs" color="white" /> : "Change Password"}
          </Button>
        </>
      )}
    </Card>
  );
};

export default ChangePassword;
