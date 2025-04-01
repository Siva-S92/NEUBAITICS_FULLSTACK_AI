import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GridChart from "../components/ScatterChart";
import { backend } from "../constant.js";
import DataGridDemo from "../components/DataGridDemo.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [total_reviews, setTotalReviews] = useState([]);

  // Fetch reviews from backend
  const fetchTotalReviews = useCallback(async () => {
    try {
      const res = await axios.get(`${backend}/api/review/get-allreviews`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"), // Get token from localStorage
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        setTotalReviews(res.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // Store the current pathname before navigating to login
      localStorage.setItem("redirectUrl", window.location.pathname);

      // Use setTimeout to delay the navigation until after the update
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 0); // The timeout is set to 0 to execute after the current call stack
    } else {
      fetchTotalReviews();
    }
  }, [fetchTotalReviews, navigate]);

  return (
    <>
      <section>
        <GridChart total_reviews={total_reviews} />
        <div className="mt-5">
          <DataGridDemo total_reviews={total_reviews} />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
