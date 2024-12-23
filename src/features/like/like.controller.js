import LikeModel from "./like.model.js";

export default class LikeController {
  static getLikesForPost(req, res, next) {
    try {
      const { postId } = req.params;
      const likes = LikeModel.getLikesForPost(postId);
      res.status(200).send({
        likes,
        message:
          likes && likes.length > 0
            ? "Likes for this post"
            : "No likes found for this post",
      });
    } catch (err) {
      next(err);
    }
  }

  static toggleLike(req, res, next) {
    try {
      const { postId } = req.params;
      const userId = req.userId;
      const like = LikeModel.toggleLike(userId, postId);
      res.status(200).send({
        like,
        message: "Like toggled",
      });
    } catch (err) {
      next(err);
    }
  }
}
