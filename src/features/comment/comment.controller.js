import CommentModel from "./comment.model.js";

export default class CommentController {
  static getAllCommentsForPost(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = CommentModel.getCommentByPostId(postId);
      res.status(200).json({ comments, message: "All comments for post" });
    } catch (error) {
      next(error);
    }
  }

  static postComment(req, res, next) {
    try {
      const { postId } = req.params;
      const { content } = req.body;

      const userId = req.userId;
      const comment = CommentModel.postComment(userId, postId, content);
      res.status(201).json({ comment, message: "Comment posted" });
    } catch (error) {
      next(error);
    }
  }

  static updateComment(req, res, next) {
    try {
      const { cmntId } = req.params;
      const { content } = req.body;
      const userId = req.userId;
      const comment = CommentModel.updateComment(cmntId, userId, content);
      res.status(200).json({ comment, message: "Comment updated" });
    } catch (error) {
      next(error);
    }
  }

  static deleteComment(req, res, next) {
    try {
      const { cmntId } = req.params;
      const userId = req.userId;
      CommentModel.deleteComment(cmntId, userId);
      res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      next(error);
    }
  }
}
