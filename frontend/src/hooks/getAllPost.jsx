import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setPostData } from "../redux/postSlice.js";

const getAllPost = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("🔍 Checking current user...");
        const result = await axios.get(`${serverUrl}/api/post/getAll`, {
          withCredentials: true,
        });
        console.log("✅ User found:", result.data);
        dispatch(setPostData(result.data));
      } catch (error) {
        console.log("❌ No user found or error:", error.response?.status, error.message);
        dispatch(setPostData(null));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [dispatch]);

  return { loading };
};

export default getAllPost;