import React, { useState } from "react";
import { backend } from "../constant";
import axios from "axios";
import {toast} from 'react-hot-toast'

const Review = ({ id, fetchAllReviews }) => {
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = async () => {
    try {
      // Form data to be sent to the backend
      let formData = { productId: id, comment: reviewText };
      console.log(formData);
  
      // Sending POST request to the backend
      const res = await axios.post(
        `${backend}/api/review/create-review`, 
        formData, 
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"), // Get token from localStorage
            "Content-Type": "application/json",
          },
        }
      );
  
      // Check if the review was created successfully
      if (res.data.success) {
        setReviewText("")
        fetchAllReviews()
        console.log(res.data.new_review); // Log new review
        toast.success(res.data.message); // Show success message
      } else {
        // Handle error if the response is unsuccessful
        toast.error(res.data.message || "An error occurred"); // Use message from response or default error
      }
    } catch (error) {
      console.log(error);
  
      // Handle errors from the backend or other issues
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage); // Show error message
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-2 bg-white shadow-lg rounded-lg">
      <h2 className="text-1xl font-semibold text-gray-800 mb-2">
        Write a Review
      </h2>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        className="w-full p-4 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 transition-colors"
        rows="3"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{reviewText.length} / 500</span>
        <button
          onClick={handleReviewSubmit}
          disabled={!reviewText.trim()}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default Review;
