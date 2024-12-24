import express from "express";
import PostController from "./post.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

const postRouter = express.Router();

postRouter.get("/filter", PostController.filterPosts);

postRouter.post("/user/bookmark/:postId", PostController.bookmarkPostToggle);
postRouter.get("/user/bookmark", PostController.getBookmarkedPosts);
postRouter.get("/user/:userId", PostController.getByUserId);

postRouter.post("/draft", upload.single("image"), PostController.saveAsDraft);

postRouter.get("/", PostController.getAll);
postRouter.post("/", upload.single("image"), PostController.createPost);

postRouter.put("/:id/archive", PostController.archivePost);
postRouter.get("/:id", PostController.getById);
postRouter.put("/:id", upload.single("image"), PostController.updatePost);
postRouter.delete("/:id", PostController.deletePost);

export default postRouter;
