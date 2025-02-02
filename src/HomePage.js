import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Aspirant from './tabs/aspirant/Aspirant';
import CareerCon from './tabs/career/CareerCon';
import HomeTab from './tabs/home/HomeTab';
import CollegeCon from './tabs/college/CollegeCon';
import Login from './tabs/login/Login';
import { useState } from 'react';
import { Tabs, Button, Menu } from '@mantine/core';
import { login, logout } from './redux/slices/authSlice'
import { IconUserCircle } from '@tabler/icons-react';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    //dispatch(login({ name: "John Doe", email: "john@example.com" })); // Replace with real login
    setActiveTab("home"); // Redirect to home after login
  };

  const handleLogout = () => {
    dispatch(logout());
    setActiveTab("home"); // Redirect to home after logout
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab} style={{ width: "100%" }}>
    <Tabs.List style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "10px" }}>
      <div style={{ display: "flex", gap: "40px" }}>
        <Tabs.Tab value="home">Home</Tabs.Tab>
        <Tabs.Tab value="aspirant">Aspirant</Tabs.Tab>
        <Tabs.Tab value="college">College Counselling</Tabs.Tab>
        <Tabs.Tab value="career">Career Counselling</Tabs.Tab>
      </div>
      
      {/* Right-side authentication UI */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "15px" }}>
        {!isLoggedIn ? (
          <Tabs.Tab value="login">Login</Tabs.Tab>
        ) : (
          <>
            <Menu>
              <Menu.Target>
                <IconUserCircle size={30} style={{ cursor: "pointer" }} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>{user?.name}</Menu.Item>
                <Menu.Item>{user?.email}</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button color="red" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </div>
    </Tabs.List>

      {/* Tabs Content */}
      <Tabs.Panel value="home"><HomeTab/></Tabs.Panel>
      <Tabs.Panel value="aspirant"><Aspirant/></Tabs.Panel>
      <Tabs.Panel value="college"><CollegeCon/></Tabs.Panel>
      <Tabs.Panel value="career"><CareerCon/></Tabs.Panel>
      {!isLoggedIn && <Tabs.Panel value="login"><Login onLogin={handleLogin}/></Tabs.Panel>}
    </Tabs>
  );
};

export default HomePage;