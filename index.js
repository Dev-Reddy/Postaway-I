// importing libraries
import express from "express";
import swagger from "swagger-ui-express";
// import middlewares
import jwtAuth from "./src/middlewares/jwtauth.middleware.js";
import ApplicationError from "./src/error/applicationError.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";

// import routes
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";

// import swagger documentation
import apiDocs from "./swagger.json" with {type: "json"};

// create an express app
const app = express();

// middleware to parse the request body
app.use(express.json());

// logger middleware
app.use(loggerMiddleware);

// use the user router
app.use("/api/user", userRouter);

// use the post router
app.use("/api/post", jwtAuth, postRouter);

// use the like router
app.use("/api/like", jwtAuth, likeRouter);

// use the comment router
app.use("/api/comment", jwtAuth, commentRouter);

// serve the API documentation
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// create a route for the app
app.get("/", (req, res) => {
  res.send("Welcome to the Post Away API");
});

// 404 route
app.use((req, res) => {
  res
    .status(404)
    .send("API not found. Please check the documentation at /api-docs");
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err.name === "MulterError") {
    res
      .status(400)
      .send({ message: "Please check the key names in form and file format" });
  } else {
    console.log("ERR: ", err);
    console.log("ERR Msg: ", err.name);
    res
      .status(500)
      .send({ message: "Something went wrong. Please try again later." });
  }
});

// export the app
export default app;
