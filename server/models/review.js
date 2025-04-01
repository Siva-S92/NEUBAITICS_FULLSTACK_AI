import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
        label:{
            type: String,
            required: true,
            trim: true
        },
        score:{
            type: String,
            required: true,
            trim: true
        },
    }
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Avoid __v field
  }
);

const Review = mongoose.model("Review", reviewSchema);

export { Review };
