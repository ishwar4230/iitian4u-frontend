import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Button, Burger, Drawer, Menu, Image } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconHome,
  IconSchool,
  IconBriefcase,
  IconLogin,
  IconUserCircle,
  IconRocket,
  IconCalendar,
  IconCalendarClock,
  IconClipboardList,
  IconLogout,
} from "@tabler/icons-react";
import axios from "axios";
import { login, logout, setAuthLoading } from "./redux/slices/authSlice";
import config from "./Config";
import ProtectedRoute from "./helpers/ProtectedRoute";
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
import AdminPanel from "./admin/AdminPanel";
import Checkout from "./tabs/checkout/Checkout";
import ThankYou from "./tabs/checkout/ThankYou";
import { About, PrivacyPolicy, RefundPolicy, TermsConditions, ContactUs } from "./tabs/footer-items/FooterPages";
import Logo from "./tabs/data/logo.svg";
import "./HomePageStyle.css";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current pathname
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
      dispatch(setAuthLoading(true)); // Set loading to true before verification starts
      try {
        const res = await axios.get(`${config.API_PREFIX}/api/auth/verify`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          dispatch(login(res.data.userId)); // Set user as logged in
        }
      } catch (error) {
        console.error("User verification failed:", error.response?.data?.message || error.message);
        dispatch(logout());
      } finally {
        dispatch(setAuthLoading(false)); // Mark authentication check as complete
      }
    };

    verifyUser();
  }, [dispatch]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("aspirant")) setActiveTab("aspirant");
    else if (path.includes("college")) setActiveTab("college");
    else if (path.includes("career")) setActiveTab("career");
    else if (path.includes("book-slot")) setActiveTab("book-slot");
    else if (path.includes("profile")) setActiveTab("profile");
    else if (path.includes("upcoming-sessions")) setActiveTab("upcoming-sessions");
    else if (path.includes("my-plans")) setActiveTab("my-plans");
    else if (path.includes("login")) setActiveTab("login");
    else if (path === '/') setActiveTab("home");
    else setActiveTab('');
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_PREFIX}/api/auth/logout`, {}, { withCredentials: true });
      dispatch(logout());
      navigate("/login");
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
    <div id="homepage-root">
      {/* Desktop Navbar */}
      {!isMobile && (
        <nav className="navbar">
          <Image src={Logo} alt="Brand Logo" height={40} />
          <div className="nav-links">
            <Button
              variant={activeTab === "home" ? "filled" : "subtle"}
              leftSection={<IconHome size={15} />}
              onClick={() => { navigate("/") }}
            >
              Home
            </Button>
            <Button
              variant={activeTab === "aspirant" ? "filled" : "subtle"}
              leftSection={<IconRocket size={15} />}
              onClick={() => { navigate("/aspirant") }}
            >
              Aspirant
            </Button>
            <Button
              variant={activeTab === "college" ? "filled" : "subtle"}
              leftSection={<IconSchool size={15} />}
              onClick={() => { navigate("/college") }}
            >
              College Counselling
            </Button>
            <Button
              variant={activeTab === "career" ? "filled" : "subtle"}
              leftSection={<IconBriefcase size={15} />}
              onClick={() => { navigate("/career") }}
            >
              Career Counselling
            </Button>

            {!isLoggedIn ? (
              <Button
                variant={activeTab === "login" ? "filled" : "subtle"}
                leftSection={<IconLogin size={15} />}
                onClick={() => { navigate("/login") }}
              >
                Login
              </Button>
            ) : (
              <>
                <Button
                  variant={activeTab === "book-slot" ? "filled" : "subtle"}
                  leftSection={<IconCalendarClock size={15} />}
                  onClick={() => { navigate("/book-slot") }}
                >
                  Book Slot
                </Button>
                <Menu
                  opened={profileDropdownOpened}
                  onClose={() => setProfileDropdownOpened(false)}
                  shadow="md"
                  position="bottom-end"
                >
                  <Menu.Target>
                    <IconUserCircle size={30} style={{ cursor: "pointer" }} onClick={() => setProfileDropdownOpened((o) => !o)} />
                  </Menu.Target>
                  <Menu.Dropdown style={{ marginTop: "10px" }}>
                    <Menu.Item
                      leftSection={<IconUserCircle size={15} />}
                      onClick={() => { navigate("/profile") }}
                    >
                      My Profile
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconCalendar size={15} />}
                      onClick={() => { navigate("/upcoming-sessions") }}
                    >
                      My Upcoming Sessions
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconClipboardList size={15} />}
                      onClick={() => { navigate("/my-plans") }}
                    >
                      My Plans
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconLogout size={15} />}
                      onClick={handleLogout}
                      color="red"
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </div>
        </nav>
      )}

      {/* Mobile Navbar */}
      {isMobile && (
        <header className="mobile-header">
          <Image src={Logo} alt="Brand Logo" height={40} />
          <Burger opened={mobileMenuOpened} onClick={() => (mobileMenuOpened ? close() : open())} aria-label="Toggle navigation" />
        </header>
      )}

      {/* Mobile Drawer Menu */}
      <Drawer opened={mobileMenuOpened} onClose={close} title="Menu" padding="md" size="75%" styles={{ content: { marginTop: "60px" } }}>
        <div className="mobile-menu">
          <Button
            variant={activeTab === "home" ? "filled" : "subtle"}
            leftSection={<IconHome size={15} />}
            onClick={() => { navigate("/"); close(); }}
          >
            Home
          </Button>
          <Button
            variant={activeTab === "aspirant" ? "filled" : "subtle"}
            leftSection={<IconRocket size={15} />}
            onClick={() => { navigate("/aspirant"); close(); }}
          >
            Aspirant
          </Button>
          <Button
            variant={activeTab === "college" ? "filled" : "subtle"}
            leftSection={<IconSchool size={15} />}
            onClick={() => { navigate("/college"); close(); }}
          >
            College Counselling
          </Button>
          <Button
            variant={activeTab === "career" ? "filled" : "subtle"}
            leftSection={<IconBriefcase size={15} />}
            onClick={() => { navigate("/career"); close(); }}
          >
            Career Counselling
          </Button>

          {!isLoggedIn ? (
            <Button
              variant={activeTab === "login" ? "filled" : "subtle"}
              leftSection={<IconLogin size={15} />}
              onClick={() => { navigate("/login"); close(); }}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                variant={activeTab === "book-slot" ? "filled" : "subtle"}
                leftSection={<IconCalendarClock size={15} />}
                onClick={() => { navigate("/book-slot"); close(); }}
              >
                Book Slot
              </Button>
              <Button
                variant={activeTab === "profile" ? "filled" : "subtle"}
                leftSection={<IconUserCircle size={15} />}
                onClick={() => { navigate("/profile"); close(); }}
              >
                Profile
              </Button>
              <Button
                variant={activeTab === "upcoming-sessions" ? "filled" : "subtle"}
                leftSection={<IconCalendar size={15} />}
                onClick={() => { navigate("/upcoming-sessions"); close(); }}
              >
                My Upcoming Sessions
              </Button>
              <Button
                variant={activeTab === "my-plans" ? "filled" : "subtle"}
                leftSection={<IconClipboardList size={15} />}
                onClick={() => { navigate("/my-plans"); close(); }}
              >
                My Plans
              </Button>
              <Button
                color="red"
                onClick={() => { handleLogout(); close(); }}
                style={{ marginTop: "10px" }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </Drawer>

      {/* Routes */}
      <div style={{ marginTop: "60px" }} id="homepage-element">
        <Routes>
          <Route path="/" element={<HomeTab />} />
          <Route path="/aspirant" element={<Aspirant />} />
          <Route path="/college" element={<CollegeCon />} />
          <Route path="/career" element={<CareerCon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-slot" element={<ProtectedRoute element={<BookSlot />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<MyDetails />} />} />
          <Route path="/upcoming-sessions" element={<ProtectedRoute element={<MyUpcomingSessions />} />} />
          <Route path="/my-plans" element={<ProtectedRoute element={<MyPlans />} />} />
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/TnC" element={<TermsConditions />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <footer className="footer" style={{ marginTop: "20px" }}>
        {/* Left Section */}
        <div className="footer-left">
          <img src={Logo} alt="IITians4U Logo" className="footer-logo" />
          <p>© {new Date().getFullYear()} IITians4U. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/iitians_4_u/" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="30" />
            </a>
            <a href="https://www.youtube.com/@IITians_4_u" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" width="40" />            
              </a>
            <a href="mailto:admin@iitians4u.in" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Mail" width="30" />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/privacy-policy">Privacy-Policy</a></li>
            <li><a href="/refund-policy">Refund-Policy</a></li>
          </ul>
          <ul>
            <li><a href={isLoggedIn ? "/" : "/login"}>Join-Us</a></li>
            <li><a href="/TnC">Terms & Conditions</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
