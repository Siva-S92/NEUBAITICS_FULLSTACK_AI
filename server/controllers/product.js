import { response } from "express";
import { Product } from "../models/product.js";

export const createProducts = async (req, res) => {
  try {
    const productData = req.body;

    // If the productData is an array, we'll treat it as multiple products
    if (Array.isArray(productData)) {
      // Validate each product in the array
      if (
        productData.some(
          (product) =>
            !product.title ||
            !product.description ||
            !product.price ||
            !product.category ||
            !product.thumbnail
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Missing required fields for one or more products (title, description, price, category)",
        });
      }

      // Create multiple products
      const products = await Product.create(productData);
      if (!products || products.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Products not created successfully",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Products created successfully",
        products,
      });
    } else {
      // If the productData is a single object, validate that
      if (
        !productData.title ||
        !productData.description ||
        !productData.price ||
        !productData.category ||
        !productData.thumbnail
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Missing required fields (title, description, price, category)",
        });
      }

      // Create a single product
      const product = await Product.create(productData);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not created successfully",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    }
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: `Validation Error: ${error.message}`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Products found",
      });
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProductbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
