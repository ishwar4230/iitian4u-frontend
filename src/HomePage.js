import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Button, Menu, Burger, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode"; // Import JWT decoder
import { login, logout } from "./redux/slices/authSlice";

import Aspirant from "./tabs/aspirant/Aspirant";
import CareerCon from "./tabs/career/CareerCon";
import HomeTab from "./tabs/home/HomeTab";
import CollegeCon from "./tabs/college/CollegeCon";
import Login from "./tabs/login/Login";
import Profile from "./tabs/profile/Profile"; // Importing Profile tab

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpened, { open, close }] = useDisclosure(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens

  // Check for authentication on page load
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode token to get user ID
        if (decoded?.id) {
          dispatch(login(decoded.id)); // Store ID as a string in Redux
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [dispatch]);

  const handleLogin = (userData) => {
    //dispatch(login(userData)); // Dispatch actual login data
    setActiveTab("home"); // Redirect to home after login
  };

  const handleLogout = () => {
    dispatch(logout());
    setActiveTab("home");
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab} style={{ width: "100%" }}>
      {/* Desktop Navbar - Hidden on Mobile */}
      {!isMobile && (
        <Tabs.List
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          {/* Left: Brand Logo */}
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>BrandLogo</div>

          {/* Right: Navigation Items */}
          <div style={{ display: "flex", gap: "40px" }}>
            <Tabs.Tab value="home">Home</Tabs.Tab>
            <Tabs.Tab value="aspirant">Aspirant</Tabs.Tab>
            <Tabs.Tab value="college">College Counselling</Tabs.Tab>
            <Tabs.Tab value="career">Career Counselling</Tabs.Tab>

            {!isLoggedIn ? (
              <Tabs.Tab value="login">Login</Tabs.Tab>
            ) : (
              <>
                <IconUserCircle
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveTab("profile")} // Open profile tab instead of dropdown
                />
                <Button color="red" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </Tabs.List>
      )}

      {/* Mobile Hamburger Menu - Hidden on Desktop */}
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px" }}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>BrandLogo</div>
          <Burger opened={mobileMenuOpened} onClick={open} aria-label="Toggle navigation" />
        </div>
      )}

      {/* Mobile Drawer Menu */}
      <Drawer opened={mobileMenuOpened} onClose={close} title="Menu" padding="md" size="75%">
        <Tabs.List style={{ display: "flex", flexDirection: "column", gap: "10px" }} onClick={close}>
          <Tabs.Tab value="home">Home</Tabs.Tab>
          <Tabs.Tab value="aspirant">Aspirant</Tabs.Tab>
          <Tabs.Tab value="college">College Counselling</Tabs.Tab>
          <Tabs.Tab value="career">Career Counselling</Tabs.Tab>
          {!isLoggedIn ? (
            <Tabs.Tab value="login">Login</Tabs.Tab>
          ) : (
            <>
              <Tabs.Tab value="profile">Profile</Tabs.Tab>
              <Button color="red" onClick={handleLogout} style={{ marginTop: "10px" }}>
                Logout
              </Button>
            </>
          )}
        </Tabs.List>
      </Drawer>

      {/* Tabs Content */}
      <Tabs.Panel value="home">
        <HomeTab />
      </Tabs.Panel>
      <Tabs.Panel value="aspirant">
        <Aspirant />
      </Tabs.Panel>
      <Tabs.Panel value="college">
        <CollegeCon />
      </Tabs.Panel>
      <Tabs.Panel value="career">
        <CareerCon />
      </Tabs.Panel>
      {!isLoggedIn && (
        <Tabs.Panel value="login">
          <Login onLogin={handleLogin} /> {/* Pass handleLogin to Login */}
        </Tabs.Panel>
      )}
      {isLoggedIn && (
        <Tabs.Panel value="profile">
          <Profile /> {/* Profile Tab */}
        </Tabs.Panel>
      )}
    </Tabs>
  );
};

export default HomePage;
