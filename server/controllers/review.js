import { Review } from "../models/review.js";
import analyzeSentiment from "../utils/huggingface_ai.js";

export const createReview = async (req, res) => {
  try {
    const { productId, comment } = req.body;
    const userId = req.user._id;

    // Analyze the sentiment of the comment
    const result = await analyzeSentiment(comment);
    console.log(result);

    // Check if result.label exists
    if (result && result.label) {
      const review = { productId, userId, comment, result };
      const new_review = await Review.create(review);

      if (!new_review) {
        return res.status(400).json({
          success: false,
          message: "The review was not added",
        });
      } else {
        console.log(new_review);
        return res.status(201).json({
          success: true,
          message: "Review created successfully",
          new_review,
        });
      }
    } else {
      // If no label is found in the sentiment analysis result
      return res.status(400).json({
        success: false,
        message: "Sentiment analysis failed or returned invalid result",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("userId", "username email") // Populating user details
      .populate("productId", "title description category price thumbnail"); // Populating product details

    // Check if reviews are empty
    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found",
      });
    }

    // If reviews are found, return them
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const { prod_id } = req.params; // Get the productId from request parameters (assuming this is from the URL)

    if (!prod_id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const reviews = await Review.find({ productId: prod_id })
      .populate("userId", "username email") // Populating user details
      .populate("productId", "title category price thumbnail") // Populating product details
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
