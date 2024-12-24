import express from "express";
import LikeController from "./like.controller.js";

const likeRouter = express.Router();

// like specific routes
likeRouter.post("/toggle/:postId", LikeController.toggleLike);
likeRouter.get("/:postId", LikeController.getLikesForPost);

export default likeRouter;
