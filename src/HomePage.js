import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Button, Burger, Drawer,Menu, Image } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconHome,
  IconSchool,
  IconBriefcase,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconLogin,
  IconUserCircle,
  IconRocket,
  IconCalendar,
  IconCalendarClock,
  IconClipboardList,
  IconLogout,
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
// import Profile from "./tabs/profile/Profile"; // Importing Profile tab
import MyDetails from "./tabs/profile/MyDetails";
import MyPlans from "./tabs/profile/MyPlans";
import MyUpcomingSessions from "./tabs/profile/MyUpcomingSessions";
import Logo from "./tabs/data/logo.svg";
import "./HomePageStyle.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpened, { open, close }] = useDisclosure(false);
  const [profileDropdownOpened, setProfileDropdownOpened] = useState(false); // Profile dropdown state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens
  const API_PREFIX = config.API_PREFIX;
  // Check for authentication on page load
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${config.API_PREFIX}/api/auth/verify`, {
          withCredentials: true, // Ensures cookies are sent
        });
  
        if (res.status === 200) {
          dispatch(login(res.data.userId)); // Store user ID in Redux
        }
      } catch (error) {
        console.error("User verification failed:", error.response?.data?.message || error.message);
        dispatch(logout());
      }
    };
  
    verifyUser();
  }, [dispatch]);
  
  const handleLogin = () => {
    //dispatch(login(userData)); // Dispatch actual login data
    setActiveTab("home"); // Redirect to home after login
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_PREFIX}/api/auth/logout`,{},{ withCredentials: true });
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
    <>
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
                  <Tabs.Tab value="slot" leftSection={<IconCalendarClock size={15} />}>
                    Book Slot
                  </Tabs.Tab>

                  {/* Profile Dropdown */}
                  <Menu
                    opened={profileDropdownOpened}
                    onClose={() => setProfileDropdownOpened(false)}
                    shadow="md"
                    position="bottom-end"
                  >
                    <Menu.Target>
                      <IconUserCircle
                        size={30}
                        style={{ cursor: "pointer" }}
                        onClick={() => setProfileDropdownOpened((o) => !o)}
                      />
                    </Menu.Target>
                    <Menu.Dropdown style={{ marginTop: "10px" }}>
                      <Menu.Item leftSection={<IconUserCircle size={15} />} onClick={() => setActiveTab("profile")}>
                        My Profile
                      </Menu.Item>
                      <Menu.Item leftSection={<IconCalendar size={15} />} onClick={() => setActiveTab("upcoming-sessions")}>
                        My Upcoming Sessions
                      </Menu.Item>
                      <Menu.Item leftSection={<IconClipboardList size={15} />} onClick={() => setActiveTab("my-plans")}>
                        My Plans
                      </Menu.Item>
                      <Menu.Item leftSection={<IconLogout size={15} />} onClick={handleLogout} color="red">
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
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
          <Burger opened={mobileMenuOpened} onClick={() => (mobileMenuOpened ? close() : open())} aria-label="Toggle navigation" />
        </div>
      )}

      {/* Mobile Drawer Menu */}
      <Drawer
         opened={mobileMenuOpened}
         onClose={close}
         title="Menu"
         padding="md"
         size="75%" 
         styles={{ content: { marginTop: "60px" } }}
      >
        <Tabs.List style={{ display: "flex", flexDirection: "column", gap: "10px" }} onClick={close}>
          <Tabs.Tab value="home" leftSection={<IconHome size={15}/>}>Home</Tabs.Tab>
          <Tabs.Tab value="aspirant" leftSection={<IconRocket size={15}/>}>Aspirant</Tabs.Tab>
          <Tabs.Tab value="college" leftSection={<IconSchool size={15} />}>College Counselling</Tabs.Tab>
          <Tabs.Tab value="career" leftSection={<IconBriefcase size={15} />}>Career Counselling</Tabs.Tab>
          {!isLoggedIn ? (
            <Tabs.Tab value="login" leftSection={<IconLogin size={15}/>}>Login</Tabs.Tab>
          ) : (
            <>
              <Tabs.Tab value="slot" leftSection={<IconCalendarClock size={15} />}>Book Slot</Tabs.Tab>
              <Tabs.Tab value="profile" leftSection={<IconUserCircle size={15} />}>Profile</Tabs.Tab>
              <Tabs.Tab value="upcoming-sessions" leftSection={<IconCalendar size={15} />}>My Upcoming Sessions</Tabs.Tab>
              <Tabs.Tab value="my-plans" leftSection={<IconClipboardList size={15} />}>My Plans</Tabs.Tab>
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
            <MyDetails /> {/* Profile Tab */}
          </Tabs.Panel>
          <Tabs.Panel value="upcoming-sessions">
          <MyUpcomingSessions />
        </Tabs.Panel>
        <Tabs.Panel value="my-plans">
          <MyPlans />
        </Tabs.Panel>
          </>
        )}
      </div>
    </Tabs>
    <footer className="footer" style={{marginTop:"20px"}}>
  {/* Left Section */}
  <div className="footer-left">
    <img src={Logo} alt="IITians4U Logo" className="footer-logo" />
    <p>© {new Date().getFullYear()} IITians4U. All Rights Reserved.</p>
    <div className="social-icons">
      <IconBrandFacebook size={20} />
      <IconBrandLinkedin size={20} />
      <IconBrandInstagram size={20} />
    </div>
  </div>

  {/* Right Section */}
  <div className="footer-right">
    <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/services">Frequently asked</a></li>
      <li><a href="/contact">Testimonials</a></li>
    </ul>
    <ul>
      <li><a href="/privacy">Aspirant</a></li>
      <li><a href="/terms">College Counselling</a></li>
      <li><a href="/faq">Career Counselling</a></li>
    </ul>
  </div>
</footer>
    </>
  );
};

export default HomePage;
