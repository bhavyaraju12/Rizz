import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("🔍 Checking current user...");
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        console.log("✅ User found:", result.data);
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log("❌ No user found or error:", error.response?.status, error.message);
        dispatch(setUserData(null));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return { loading };
};

export default getCurrentUser;