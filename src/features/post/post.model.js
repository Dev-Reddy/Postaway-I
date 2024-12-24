import ApplicationError from "../../error/applicationError.js";

export default class PostModel {
  constructor(userId, caption, imageUrl, status, id) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.likes = 0;
    this.comments = 0;
    this.bookmarks = [];
  }

  static getAll() {
    const allPosts = posts.filter((post) => post.status === "posted");
    if (!allPosts || allPosts.length === 0) {
      throw new ApplicationError("No posts found", 404);
    }
    return allPosts;
  }

  static filterPosts(caption) {
    console.log("filterPosts");
    const filteredPosts = posts.filter(
      (post) =>
        post.caption.toLowerCase().includes(caption.toLowerCase()) ||
        caption.toLowerCase().includes(post.caption.toLowerCase())
    );
    if (!filteredPosts || filteredPosts.length === 0) {
      throw new ApplicationError("No posts found for this search query", 404);
    }
    return filteredPosts;
  }

  static getById(id) {
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }
    return post;
  }

  static getByUserId(userId) {
    const userPosts = posts.filter((post) => post.userId === Number(userId));

    if (!userPosts || userPosts.length === 0) {
      throw new ApplicationError("No posts found for this user", 404);
    }

    return userPosts;
  }

  static createPost(userId, caption, imageUrl) {
    const post = new PostModel(
      userId,
      caption,
      imageUrl,
      "posted",
      posts.length + 1
    );
    posts.push(post);
    return post;
  }

  static saveAsDraft(userId, caption, imageUrl) {
    const post = new PostModel(
      userId,
      caption,
      imageUrl,
      "draft",
      posts.length + 1
    );
    posts.push(post);
    console.log("post", post);
    return post;
  }

  static updatePost(id, caption, imageUrl, userId) {
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }
    if (post.userId !== userId) {
      throw new ApplicationError(
        "Unauthorized to update this post as it does not belong to the user",
        401
      );
    }
    post.caption = caption;
    post.imageUrl = imageUrl;
    post.updatedAt = new Date();
    post.status = "posted";
    return post;
  }

  static deletePost(id, userId) {
    const index = posts.findIndex((post) => post.id === Number(id));
    if (index === -1) {
      throw new ApplicationError("Post not found", 404);
    }
    if (posts[index].userId !== userId) {
      throw new ApplicationError(
        "Unauthorized to delete this post as it does not belong to user",
        401
      );
    }
    posts.splice(index, 1);
  }

  //   static publishPost(id) {
  //     const post = posts.find((post) => post.id === Number(id));
  //     if (!post) {
  //       throw new ApplicationError("Post not found", 404);
  //     }
  //     post.status = "posted";
  //     return post;
  //   }

  static archivePost(id, userId) {
    console.log("archivePost");
    console.log("id", id);
    console.log("userId", userId);
    console.log("posts", posts);
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }
    if (post.userId !== userId) {
      throw new ApplicationError(
        "Unauthorized to archive this post as it does not belong to user",
        401
      );
    }
    post.status = "archived";
    return post;
  }

  static updatePostLikes(id, like) {
    console.log("updatePostLikes");
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }

    post.likes += like;
    console.log("post.likes", post.likes);

    if (post.likes < 0) {
      post.likes = 0;
    }
  }

  static getPostLikes(id) {
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }
    return post.likes;
  }

  static updatePostComments(id, comment) {
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }

    post.comments += comment;
    if (post.comments < 0) {
      post.comments = 0;
    }
  }

  static getPostComments(id) {
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }
    return post.comments;
  }

  static bookmarkPostToggle(id, userId) {
    const post = posts.find((post) => post.id === Number(id));
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }
    if (!post.bookmarks) {
      post.bookmarks = [];
    }
    if (post.bookmarks.includes(userId)) {
      post.bookmarks = post.bookmarks.filter((bookmark) => bookmark !== userId);
    } else {
      post.bookmarks.push(userId);
    }
    return post;
  }

  static getBookmarkedPosts(userId) {
    const bookmarkedPosts = posts.filter((post) => {
      if (!post.bookmarks) {
        post.bookmarks = [];
      }
      return post.bookmarks.includes(userId);
    });
    if (!bookmarkedPosts || bookmarkedPosts.length === 0) {
      throw new ApplicationError("No bookmarked posts found", 404);
    }
    return bookmarkedPosts;
  }
}

let posts = [
  {
    id: 1,
    userId: 1,
    caption: "caption",
    imageUrl: "imageUrl",
    status: "posted",
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    comments: 0,
  },
  {
    id: 2,
    userId: 1,
    caption: "caption",
    imageUrl: "imageUrl",
    status: "posted",
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    comments: 0,
  },
  {
    id: 3,
    userId: 1,
    caption: "caption",
    imageUrl: "imageUrl",
    status: "archived",
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    comments: 0,
  },
  {
    id: 4,
    userId: 2,
    caption: "caption",
    imageUrl: "imageUrl",
    status: "posted",
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    comments: 0,
  },
  {
    id: 5,
    userId: 2,
    caption: "caption",
    imageUrl: "imageUrl",
    status: "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    comments: 0,
  },
];
