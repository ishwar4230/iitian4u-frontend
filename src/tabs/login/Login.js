import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { Button, TextInput, PasswordInput, Card, Group } from "@mantine/core";
import axios from "axios";
import config from "../../Config";
import { notifications } from '@mantine/notifications';
const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const API_PREFIX = config.API_PREFIX;

  const handleLogin = async () => {
    try {
      console.log(mobile,password);
      const res = await axios.post(`${API_PREFIX}/api/auth/login`, { phone: mobile, password }, { withCredentials: true });
      console.log(res);
      dispatch(login(res.data.user.id)); // Store user ID in Redux
      onLogin(); // Redirect to Home tab
      notifications.show({
              title: 'Success!',
              message: 'Logged in successfully',
              color: 'green',
            })
    } catch (error) {
      notifications.show({
        title: 'Error!',
        message: `Error while logging in ${error.response?.data?.message}`,
        color: 'red',
      })
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post(`${API_PREFIX}/api/auth/register`, { name, email, phone: mobile, password });
      setIsSignup(false); // Switch to login after signup
      notifications.show({
        title: 'Success!',
        message: 'Signed up successfully, Login Now!',
        color: 'green',
      })
    } catch (error) {
      notifications.show({
        title: 'Error!',
        message: `Error while signing up ${error.response?.data?.message}`,
        color: 'red',
      })
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

      <TextInput label="Mobile" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} required mt="md" />
      <PasswordInput label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required mt="md" />

      <Button color="blue" fullWidth mt="md" onClick={isSignup ? handleSignup : handleLogin}>
        {isSignup ? "Sign Up" : "Login"}
      </Button>

      <Group position="center" mt="md">
        <Button variant="subtle" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </Button>
      </Group>
    </Card>
  );
};

export default Login;
