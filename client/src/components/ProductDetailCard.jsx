import React, { useState, useEffect, useCallback } from "react";
import Review from "./Review";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Make sure to import axios if you haven't already
import { backend } from "../constant";
import { FaUserCircle } from "react-icons/fa";

const ProductDetailCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [current_product, setCurrentProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchAllReviews = useCallback(async () => {
    try {
      const res = await axios.get(`${backend}/api/review/get-reviews/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"), // Get token from localStorage
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        console.log(res.data.reviews);
        setReviews(res.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAllReviews();
  }, [fetchAllReviews]);

  // Fetch product data
  const getCurrentProduct = async () => {
    try {
      const res = await axios.get(`${backend}/api/products/get-product/${id}`);
      if (res.data.success) {
        setCurrentProduct(res.data.product);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // Store the current pathname before navigating to login
      localStorage.setItem("redirectUrl", window.location.pathname);

      // Use setTimeout to delay the navigation until after the update
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 0); // The timeout is set to 0 to execute after the current call stack
    } else {
      getCurrentProduct();
    }
  }, [getCurrentProduct, navigate]);

  if (!current_product) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    ); // Placeholder while the product is being fetched
  }

  return (
    <>
      <div
        onClick={() => navigate("/")}
        className="text-blue-500 text-center underline underline-offset-4 cursor-pointer my-2 "
      >
        Go&nbsp;back&nbsp;to&nbsp;products
      </div>
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="flex-shrink-0 w-full sm:w-80 lg:w-1/3 mb-6 lg:mb-0">
            <img
              className="w-full h-80 object-cover rounded-lg shadow-md"
              src={current_product.thumbnail}
              alt="product-image"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-between w-full lg:w-2/3 pl-0 lg:pl-8">
            <div className="w-full max-w-xl mx-auto p-2">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {current_product.title}
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Category: {current_product.category}
              </p>
              <p className="text-xl font-bold text-gray-900 mb-2">
                <strong>Price:</strong> ${current_product.price}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="mt-1">
              <Review id={id} fetchAllReviews={fetchAllReviews} />
              <div className="w-full max-w-xl mx-auto p-2 rounded-lg border border-gray-300 px-4 mt-2">
                <div className="reviews-section mt-1 h-60 overflow-y-auto ">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Reviews:
                  </h3>
                  {reviews.length > 0 ? (
                    <ul className="mt-4 space-y-4 max-h-[20rem] overflow-y-scroll">
                      {reviews.length > 0 &&
                        reviews.map((review, index) => (
                          <li
                            key={index}
                            className="text-gray-700 border-b border-gray-300 pb-2"
                          >
                            <div className="flex items-center">
                              <FaUserCircle />
                              <span className="font-bold ml-1">
                                {" "}
                                {review.userId.username}:
                              </span>
                            </div>
                            <p>
                              {review.comment} ---{" "}
                              <span className="text-sm">
                                sentiment:{review.result.label}
                              </span>
                            </p>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailCard;
