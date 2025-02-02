import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { Button, TextInput, PasswordInput, Card } from "@mantine/core";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Dummy authentication logic (Replace with API call)
    if (email === "test@example.com" && password === "password123") {
      dispatch(login({ name: "John Doe", email })); // Update Redux state
      onLogin(); // Redirect to Home tab
    } else {
      alert("Invalid credentials! Try email: test@example.com, password: password123");
    }
  };

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 400, margin: "auto", marginTop: "50px" }}>
      <h2>Login</h2>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        mt="md"
      />
      <Button color="blue" fullWidth mt="md" onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
};

export default Login;
