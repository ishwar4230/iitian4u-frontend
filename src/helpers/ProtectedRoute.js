import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authLoading = useSelector((state) => state.auth.authLoading);
  const location = useLocation();
  // Wait until authentication check is complete
  if (authLoading) {
    return <div>Loading...</div>; // Replace with a loader if needed
  }

  if (!isLoggedIn) {
    // Store the intended path in session storage
    sessionStorage.setItem("from", location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
