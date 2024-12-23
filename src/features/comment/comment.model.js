import ApplicationError from "../../error/applicationError.js";
import PostModel from "../post/post.model.js";

export default class CommentModel {
  constructor(userId, postId, content, id) {
    this.id = Number(id);
    this.userId = Number(userId);
    this.postId = Number(postId);
    this.content = content;
  }

  static getCommentByPostId(postId) {
    const postComments = comments.filter(
      (comment) => comment.postId === Number(postId)
    );

    if (!postComments || postComments.length === 0) {
      throw new ApplicationError("No comments found for the post", 404);
    }
    return postComments;
  }

  static postComment(userId, postId, content) {
    const newComment = new CommentModel(
      userId,
      postId,
      content,
      comments.length + 1
    );
    comments.push(newComment);
    PostModel.updatePostComments(postId, 1);
    return newComment;
  }

  static updateComment(commentId, userId, content) {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === Number(commentId)
    );

    if (commentIndex === -1) {
      throw new ApplicationError("Comment not found", 404);
    }

    if (comments[commentIndex].userId !== userId) {
      throw new ApplicationError(
        "You are not authorized to update this comment",
        403
      );
    }

    comments[commentIndex].content = content;
    return comments[commentIndex];
  }

  static deleteComment(commentId, userId) {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === Number(commentId)
    );

    if (commentIndex === -1) {
      throw new ApplicationError("Comment not found", 404);
    }

    if (comments[commentIndex].userId !== userId) {
      throw new ApplicationError(
        "You are not authorized to delete this comment",
        403
      );
    }

    PostModel.updatePostComments(comments[commentIndex].postId, -1);

    comments.splice(commentIndex, 1);
  }
}

let comments = [
  // new CommentModel(userId, postId, content, id)
  // new CommentModel(1, 1, "This is a comment", 1),
  // new CommentModel(1, 1, "This is a comment", 2),
  // new CommentModel(1, 2, "This is a comment", 3),
  // new CommentModel(1, 3, "This is a comment", 4),
  // new CommentModel(2, 4, "This is a comment", 5),
  // new CommentModel(2, 4, "This is a comment", 6),
  // new CommentModel(2, 5, "This is a comment", 7),
  // new CommentModel(2, 1, "This is a comment", 8),
  // new CommentModel(3, 1, "This is a comment", 9),
  // new CommentModel(3, 1, "This is a comment", 10),
];
