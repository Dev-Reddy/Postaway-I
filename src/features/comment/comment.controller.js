import CommentModel from "./comment.model.js";

// CommentController class
export default class CommentController {
  // get all the comments for a post with pagination
  static getAllCommentsForPost(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = CommentModel.getCommentByPostId(postId);
      const { pageNo } = req.query;
      if (pageNo) {
        const startIndex = (pageNo - 1) * 10;
        const endIndex = pageNo * 10;
        const paginatedComments = comments.slice(startIndex, endIndex);
        if (paginatedComments.length === 0) {
          throw new ApplicationError("No comments found for the page", 404);
        }
        return res.status(200).send({
          comments: paginatedComments,
          message: `Returning comments on page no: ${pageNo}`,
        });
      }
      res.status(200).json({ comments, message: "All comments for post" });
    } catch (error) {
      next(error);
    }
  }

  // post a comment for a post

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

  // update a comment
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

  // delete a comment

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
