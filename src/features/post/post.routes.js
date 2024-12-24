import express from "express";
import PostController from "./post.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

const postRouter = express.Router();

// specific routes are mentioned first and then the generic ones

// filter posts based on query params
postRouter.get("/filter", PostController.filterPosts);

// user specific actions on posts
postRouter.post("/user/bookmark/:postId", PostController.bookmarkPostToggle);
postRouter.get("/user/bookmark", PostController.getBookmarkedPosts);
postRouter.get("/user/:userId", PostController.getByUserId);

// save post as draft
postRouter.post("/draft", upload.single("image"), PostController.saveAsDraft);

// get all posts and create a post
postRouter.get("/", PostController.getAll);
postRouter.post("/", upload.single("image"), PostController.createPost);

// get, archive, update and delete post
postRouter.put("/:id/archive", PostController.archivePost);
postRouter.get("/:id", PostController.getById);
postRouter.put("/:id", upload.single("image"), PostController.updatePost);
postRouter.delete("/:id", PostController.deletePost);

export default postRouter;
