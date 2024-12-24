import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  // Get token from header
  const token = req.headers["authorization"];

  // Check if token is not provided
  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token provided" });
  }

  // Verify token
  try {
    const payload = jwt.verify(token, "i+r1+yG&dC'y0ZL|}id7P().QAWi'e");
    req.userId = payload.userId;
    // console.log("Payload: ", payload);
  } catch (error) {
    // Check if token is expired
    if (error.name === "TokenExpiredError") {
      // if token is expired then inform user
      return res.status(401).json({ message: "Unauthorized. Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
  next();
}
