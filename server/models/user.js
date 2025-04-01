import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    //   match: [/\S+@\S+\.\S+/, "Please provide a valid email address"], // Email regex
    },
    password: {
      type: String,
      required: true,
      trim: true,
    //   minlength: [8, "Password must be at least 8 characters long"], // Example password length validation
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Avoid __v field
  }
);

const User = mongoose.model("User", userSchema); // Ensure the model name is capitalized
export { User };
