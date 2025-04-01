import express from "express";
import { createReview, getAllReviews, getReviewsByProductId } from "../controllers/review.js";
import { isAuthorized } from "../middlewares/auth.js";




const router  = express.Router();

router.post("/create-review", isAuthorized, createReview)
router.get("/get-reviews/:prod_id", isAuthorized, getReviewsByProductId)
router.get("/get-allreviews/", isAuthorized, getAllReviews)



export const reviewRouter = router;