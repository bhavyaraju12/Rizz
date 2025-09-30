import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import getCurrentUser from "./hooks/getCurrentUser";
import getSuggestedUsers from "./hooks/getSuggestedUsers";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

export const serverUrl = "http://localhost:8000";

const App = () => {
  const { userData, isAuthChecked } = useSelector((state) => state.user);
  
  
  const { loading: isUserLoading } = getCurrentUser();
  const { loading: areSuggestionsLoading } = getSuggestedUsers();

  
  if (isUserLoading || areSuggestionsLoading || !isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />
      <Route
        path="/profile/:userName"
        element={userData ? <Profile /> : <Navigate to="/signin" />}
      />
      <Route
        path="/editprofile"
        element={userData ? <EditProfile /> : <Navigate to="/signin" />}
      />
      
    </Routes>
  );
};

export default App;