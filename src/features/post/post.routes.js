import express from "express";
import PostController from "./post.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

const postRouter = express.Router();

postRouter.get("/filter", PostController.filterPosts);
postRouter.get("/user/:userId", PostController.getByUserId);
postRouter.put("/:id/archive", PostController.archivePost);
// postRouter.post("/:id/bookmark", PostController.bookmarkPost);
postRouter.post("/draft", upload.single("image"), PostController.saveAsDraft);

postRouter.get("/", PostController.getAll);
postRouter.post("/", upload.single("image"), PostController.createPost);
postRouter.get("/:id", PostController.getById);
postRouter.put("/:id", upload.single("image"), PostController.updatePost);
postRouter.delete("/:id", PostController.deletePost);

export default postRouter;
