import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import getCurrentUser from "./hooks/getCurrentUser";
import getSuggestedUsers from "./hooks/getSuggestedUsers";

export const serverUrl = "http://localhost:8000";

const App = () => {
  const { userData, isAuthChecked } = useSelector((state) => state.user);
  
  // FIX 1: Alias the loading variables to avoid redeclaration
  const { loading: isUserLoading } = getCurrentUser();
  const { loading: areSuggestionsLoading } = getSuggestedUsers();

  // FIX 2: Wait for BOTH loading states to complete AND auth to be checked
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
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default App;