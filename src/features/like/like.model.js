import PostModel from "../post/post.model.js";
export default class LikeModel {
  constructor(userId, postId, id) {
    this.id = id;
    this.userId = Number(userId);
    this.postId = Number(postId);
    this.status = true;
  }

  static getLikesForPost(postId) {
    const postLikes = likes.filter(
      (like) => like.postId === Number(postId) && like.status
    );

    if (!postLikes || postLikes.length === 0) {
      return [];
    }

    return postLikes;
  }

  static toggleLike(userId, postId) {
    const like = likes.find(
      (like) => like.userId === Number(userId) && like.postId === Number(postId)
    );

    console.log("userId", userId);
    console.log("postId", postId);
    console.log("like", like);
    console.log("likes", likes);

    // the like status is used only because we are using index + 1 as id
    // because deleting an element from the array would mess up the id
    // if we were using a proper id generator, we would not need this

    // if like exists, toggle the status
    if (like) {
      if (like.status) {
        like.status = false;
        PostModel.updatePostLikes(postId, -1);
        return;
      } else {
        like.status = true;
        PostModel.updatePostLikes(postId, 1);
        return;
      }
    }

    // if like does not exist, create a new like

    console.log("Creating new like");

    const newLike = new LikeModel(userId, postId, likes.length + 1);
    PostModel.updatePostLikes(postId, 1);
    likes.push(newLike);
    return;
  }
}

const likes = [
  // new LikeModel(1, 1, 1),
  // new LikeModel(2, 1, 2),
  // new LikeModel(3, 1, 3),
  // new LikeModel(4, 1, 4),
  // new LikeModel(1, 2, 5),
  // new LikeModel(6, 2, 6),
  // new LikeModel(3, 2, 7),
  // new LikeModel(2, 3, 8),
  // new LikeModel(6, 3, 9),
];
