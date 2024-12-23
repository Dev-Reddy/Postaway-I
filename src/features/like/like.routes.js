import express from "express";
import LikeController from "./like.controller.js";

const likeRouter = express.Router();

likeRouter.post("/toggle/:postId", LikeController.toggleLike);
likeRouter.get("/:postId", LikeController.getLikesForPost);

export default likeRouter;
