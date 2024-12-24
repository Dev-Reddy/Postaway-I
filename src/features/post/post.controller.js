import PostModel from "./post.model.js";

function sortPosts(posts, sort) {
  return posts.sort((a, b) => {
    const engagementA = a.comments.length + a.likes.length;
    const engagementB = b.comments.length + b.likes.length;

    if (sort === "asc") {
      // Compare by engagement (ascending)
      if (engagementA !== engagementB) {
        return engagementA - engagementB;
      }
      // If engagement is equal, compare by date (oldest first)
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      // Compare by engagement (descending)
      if (engagementA !== engagementB) {
        return engagementB - engagementA;
      }
      // If engagement is equal, compare by date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
}

export default class PostController {
  // Get all posts
  static getAll(req, res, next) {
    try {
      const posts = PostModel.getAll();
      const { sort, pageNo } = req.query;
      if (sort && pageNo) {
        const startIndex = (pageNo - 1) * 10;
        const endIndex = pageNo * 10;
        const sortedPosts = sortPosts(posts, sort);
        const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
        res.status(200).json({
          posts: paginatedPosts,
          message: `Posts sorted in ${sort} order and returning with page no: ${pageNo}`,
        });
      } else if (sort) {
        const sortedPosts = sortPosts(posts, sort);
        res.status(200).json({
          posts: sortedPosts,
          message: `Posts sorted in ${sort} order`,
        });
      } else if (pageNo) {
        const startIndex = (pageNo - 1) * 10;
        const endIndex = pageNo * 10;
        const paginatedPosts = posts.slice(startIndex, endIndex);
        res.status(200).json({
          posts: paginatedPosts,
          message: `Returning posts with page no: ${pageNo}`,
        });
      } else {
        res.status(200).json({ posts, message: "All posts" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Filter posts based on search query
  static filterPosts(req, res, next) {
    try {
      const { search, sort, pageNo } = req.query;
      const posts = PostModel.filterPosts(search);
      if (sort && pageNo) {
        const startIndex = (pageNo - 1) * 10;
        const endIndex = pageNo * 10;
        const sortedPosts = sortPosts(posts, sort);
        const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
        res.status(200).json({
          posts: paginatedPosts,
          message: `Filtered posts sorted in ${sort} order and returning with page no: ${pageNo}`,
        });
      } else if (sort) {
        const sortedPosts = sortPosts(posts, sort);
        res.status(200).json({
          posts: sortedPosts,
          message: `Filtered posts sorted in ${sort} order`,
        });
      } else if (pageNo) {
        const startIndex = (pageNo - 1) * 10;
        const endIndex = pageNo * 10;
        const paginatedPosts = posts.slice(startIndex, endIndex);
        res.status(200).json({
          posts: paginatedPosts,
          message: `Filtered posts returning with page no: ${pageNo}`,
        });
      } else {
        res.status(200).json({ posts, message: "Filtered posts" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Get post by id
  static getById(req, res, next) {
    try {
      const { id } = req.params;
      const post = PostModel.getById(id);
      res.status(200).json({ post, message: "Post found" });
    } catch (error) {
      next(error);
    }
  }

  // Get post by user id
  static getByUserId(req, res, next) {
    try {
      const posts = PostModel.getByUserId(req.params.userId);
      res.status(200).json({ posts, message: "Posts found" });
    } catch (error) {
      next(error);
    }
  }

  // Create post
  static createPost(req, res, next) {
    try {
      const { caption } = req.body;
      const userId = req.userId;
      const imageUrl = req.file.filename;
      const post = PostModel.createPost(userId, caption, imageUrl);
      res.status(201).json({ post, message: "Post created" });
    } catch (error) {
      next(error);
    }
  }

  // Save as draft
  static saveAsDraft(req, res, next) {
    try {
      const { caption } = req.body;
      const userId = req.userId;
      const imageUrl = req.file.filename;
      const post = PostModel.saveAsDraft(userId, caption, imageUrl);
      res.status(201).json({ post, message: "Post saved as draft" });
    } catch (error) {
      next(error);
    }
  }

  // Update post
  static updatePost(req, res, next) {
    try {
      const { caption } = req.body;
      const imageUrl = req.file.filename;
      const userId = req.userId;
      const id = req.params.id;
      const post = PostModel.updatePost(id, caption, imageUrl, userId);
      res.status(200).json({ post, message: "Post updated" });
    } catch (error) {
      next(error);
    }
  }

  // Delete post
  static deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      PostModel.deletePost(id, userId);
      res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      next(error);
    }
  }

  // // Publish post
  // static publishPost(req, res, next) {
  //     try {
  //         const post = PostModel.publishPost(req.params.id);
  //         res.status(200).json({ post, message: "Post published" });
  //     } catch (error) {
  //         next(error);
  //     }
  // }

  // Archive post
  static archivePost(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.userId;
      PostModel.archivePost(id, userId);
      res.status(200).json({ message: "Post archived" });
    } catch (error) {
      next(error);
    }
  }

  // bookmark post for the user
  static bookmarkPostToggle(req, res, next) {
    try {
      console.log("Bookmark pos");
      const userId = req.userId;
      const postId = req.params.postId;
      console.log("userId", userId);
      console.log("postId", postId);
      const post = PostModel.bookmarkPostToggle(postId, userId);
      res.status(200).send({ post, message: "Post bookmark toggled" });
    } catch (error) {
      next(error);
    }
  }

  // get posts bookmarked by the user
  static getBookmarkedPosts(req, res, next) {
    try {
      const userId = req.userId;
      const posts = PostModel.getBookmarkedPosts(userId);
      res.status(200).send({ posts, message: "Bookmarked posts for the user" });
    } catch (error) {
      next(error);
    }
  }
}
