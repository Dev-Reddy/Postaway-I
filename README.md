# Project Title

An advanced Node.js project that implements features such as user management, post creation, comments, likes, and more, with robust middleware and modular architecture.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Running the Server](#running-the-server)
4. [Tasks Completed](#tasks-completed)
5. [Features](#features)
6. [Folder Structure](#folder-structure)
7. [API Documentation](#api-documentation)
8. [Technologies Used](#technologies-used)
9. [Contributing](#contributing)
10. [License](#license)

---

## Project Overview

This project is designed to serve as a backend service with modular components for user management, post creation, commenting, liking, and robust error handling. It employs a well-structured folder hierarchy for scalability and maintainability.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

## Running the Server

To start the server:

1. Ensure all dependencies are installed.
2. Run the following command in your terminal:

   ```bash
   node server.js
   ```

3. The server will start on `http://localhost:3000`.

---

## Tasks Completed

### Primary Tasks

1. **User Management** - Done
   - Implemented user routes, models, and controllers for CRUD operations.

2. **Post Management** - Done
   - Created APIs for creating, reading, updating, and deleting posts.

3. **Comments on Posts** - Done
   - Developed comment functionality linked to posts.

4. **Like Functionality** - Done
   - Added the ability to like and unlike posts or comments.

5. **Error Handling** - Done
   - Centralized error management with `ApplicationError` class in `applicationError.js`.

6. **JWT Authentication Middleware** - Done
   - Secured endpoints with JWT-based authentication.

7. **File Upload Middleware** - Done
   - Enabled file uploads for posts or user profiles.

8. **Logger Middleware** - Done
   - Implemented logging middleware to log requests.

9. **Documentation** - Done
   - Added API documentation using Swagger.

### Additional Tasks

1. **Filter posts based on caption** - Done
   - Added a filter to search posts based on caption.

2. **Save post as draft or archive** - Done
   - Implemented the ability to save posts as drafts or archives.

3. **Sorting posts** - Done
   - Added sorting functionality to sort posts based on engagement and date.

4. **Bookmark posts** - Done
   - Added the ability to bookmark posts for later viewing.

5. **Pagination** - Done
   - Implemented pagination for posts and comments.

---

## Features

- **User Management**: Create, update, delete, and retrieve user data.
- **Post Management**: CRUD operations for posts.
- **Comments**: Add, edit, and delete comments on posts.
- **Likes**: Like or unlike posts and comments.
- **File Uploads**: Support for uploading user avatars or post images.
- **Authentication**: Secure API with JWT.
- **Logging**: Maintain logs for debugging and monitoring.
- **Error Handling**: Unified error response structure.

---

## Folder Structure

```
src/
├── error/
│   └── applicationError.js
├── features/
│   ├── comment/
│   │   ├── comment.controller.js
│   │   ├── comment.model.js
│   │   └── comment.routes.js
│   ├── like/
│   │   ├── like.controller.js
│   │   ├── like.model.js
│   │   └── like.routes.js
│   ├── post/
│   │   ├── post.controller.js
│   │   ├── post.model.js
│   │   └── post.routes.js
│   └── user/
│       ├── user.controller.js
│       ├── user.model.js
│       └── user.routes.js
├── middlewares/
│   ├── fileupload.middleware.js
│   ├── jwtauth.middleware.js
│   └── logger.middleware.js
uploads/
.gitignore
index.js
logs.log
package-lock.json
package.json
README.md
server.js
swagger.json
```

---

## API Documentation

Refer to the `swagger.json` file for detailed API endpoints and their usage.

To view the documentation:

1. Start the server.
2. Open a browser and navigate to `http://localhost:3000/api-docs` (if Swagger UI is set up).

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT for Authentication**
- **Multer for File Uploads**
- **Swagger for API Documentation**

---

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-branch
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add some feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-branch
   ```

5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
