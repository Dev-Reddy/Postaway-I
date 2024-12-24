import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();

// post specific routes
commentRouter.get("/:postId", CommentController.getAllCommentsForPost);
commentRouter.post("/:postId", CommentController.postComment);

// comment specific routes
commentRouter.put("/:cmntId", CommentController.updateComment);
commentRouter.delete("/:cmntId", CommentController.deleteComment);

export default commentRouter;
