import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Button, Menu, Burger, Drawer, Image } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconHome,
  IconSchool,
  IconBriefcase,
  IconLogin,
  IconUserCircle,
  IconRocket,
  } from "@tabler/icons-react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Import JWT decoder
import axios from "axios";
import { login, logout } from "./redux/slices/authSlice";
import config from "./Config";

import Aspirant from "./tabs/aspirant/Aspirant";
import CareerCon from "./tabs/career/CareerCon";
import HomeTab from "./tabs/home/HomeTab";
import CollegeCon from "./tabs/college/CollegeCon";
import Login from "./tabs/login/Login";
import BookSlot from "./tabs/slot/BookSlot";
import Profile from "./tabs/profile/Profile"; // Importing Profile tab
import Logo from "./tabs/data/logo.svg";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpened, { open, close }] = useDisclosure(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens
  const API_PREFIX = config.API_PREFIX;
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

  const handleLogin = () => {
    //dispatch(login(userData)); // Dispatch actual login data
    setActiveTab("home"); // Redirect to home after login
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${API_PREFIX}/api/auth/logout`,{ withCredentials: true });
      Cookies.remove("token");
      dispatch(logout());
      setActiveTab("home");
      notifications.show({
              title: 'Logged out!',
              message: 'Logged out successfully',
              color: 'green',
            })
    } catch (error) {
      alert(error.response?.data?.message || "Logout failed!");
    }
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab} style={{ width: "100%" }}>
      {/* Desktop Navbar - Hidden on Mobile */}
      {!isMobile && (
        <Tabs.List
          style={{
            position: "fixed",  // Fixed position to keep it on top
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,  // Ensures it's above other elements
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "white", // Ensure background color is visible
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds slight shadow for depth
          }}
        >
          {/* Left: Brand Logo */}
          <Image src={Logo} alt="Brand Logo" height={40} />

          {/* Right: Navigation Items */}
          <div style={{ display: "flex", gap: "40px" }}>
            <Tabs.Tab value="home" leftSection={<IconHome size={15}/>}>Home</Tabs.Tab>
            <Tabs.Tab value="aspirant" leftSection={<IconRocket size={15}/>}>Aspirant</Tabs.Tab>
            <Tabs.Tab value="college" leftSection={<IconSchool size={15} />}>College Counselling</Tabs.Tab>
            <Tabs.Tab value="career" leftSection={<IconBriefcase size={15} />}>Career Counselling</Tabs.Tab>

            {!isLoggedIn ? (
              <Tabs.Tab value="login" leftSection={<IconLogin size={15}/>}>Login</Tabs.Tab>
            ) : (
              <>
                <Tabs.Tab value="slot" leftSection={<IconBriefcase size={15} />}>Book Slot</Tabs.Tab>
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
        <div
         style={{
          position: "fixed",  // Fix the navbar at the top
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,  // Ensures it's above other elements
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "white", // Ensure background is visible
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds a shadow effect 
          }}
        >
          <Image src={Logo} alt="Brand Logo" height={40} />
          <Burger opened={mobileMenuOpened} onClick={open} aria-label="Toggle navigation" />
        </div>
      )}

      {/* Mobile Drawer Menu */}
      <Drawer opened={mobileMenuOpened} onClose={close} title="Menu" padding="md" size="75%">
        <Tabs.List style={{ display: "flex", flexDirection: "column", gap: "10px" }} onClick={close}>
          <Tabs.Tab value="home" leftSection={<IconHome size={15}/>}>Home</Tabs.Tab>
          <Tabs.Tab value="aspirant" leftSection={<IconRocket size={15}/>}>Aspirant</Tabs.Tab>
          <Tabs.Tab value="college" leftSection={<IconSchool size={15} />}>College Counselling</Tabs.Tab>
          <Tabs.Tab value="career" leftSection={<IconBriefcase size={15} />}>Career Counselling</Tabs.Tab>
          {!isLoggedIn ? (
            <Tabs.Tab value="login" leftSection={<IconLogin size={15}/>}>Login</Tabs.Tab>
          ) : (
            <>
              <Tabs.Tab value="slot" leftSection={<IconBriefcase size={15} />}>Book Slot</Tabs.Tab>
              <Tabs.Tab value="profile" leftSection={<IconUserCircle size={15} />}>Profile</Tabs.Tab>
              <Button color="red" onClick={handleLogout} style={{ marginTop: "10px" }}>
                Logout
              </Button>
            </>
          )}
        </Tabs.List>
      </Drawer>

      {/* Tabs Content */}
      <div style={{ marginTop: "60px" }}>
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
          <>
          <Tabs.Panel value="slot">
          <BookSlot /> {/* Profile Tab */}
        </Tabs.Panel>
          <Tabs.Panel value="profile">
            <Profile /> {/* Profile Tab */}
          </Tabs.Panel>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default HomePage;
