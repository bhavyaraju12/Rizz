import { useState, useEffect } from "react";
// FIX 1: Import useSelector here
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setSuggestedUsers } from "../redux/userSlice";

const getSuggestedUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      // RECOMMENDATION 1: Prevent API call if there is no user
      if (!userData) {
        setLoading(false);
        return;
      }

      try {
        const result = await axios.get(`${serverUrl}/api/user/suggested`, {
          withCredentials: true,
        });
        dispatch(setSuggestedUsers(result.data));
      } catch (error) {
        console.error("Error fetching suggested users:", error.message);
        dispatch(setSuggestedUsers(null));
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
    // RECOMMENDATION 2: Add dispatch to the dependency array
  }, [userData, dispatch]);

  return { loading };
};

export default getSuggestedUsers;