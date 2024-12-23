import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();

commentRouter.get("/:postId", CommentController.getAllCommentsForPost);
commentRouter.post("/:postId", CommentController.postComment);
commentRouter.put("/:cmntId", CommentController.updateComment);
commentRouter.delete("/:cmntId", CommentController.deleteComment);

export default commentRouter;
