
import User from "../models/user.model.js";
import { verifyToken } from "../utils/genrateToken.js";

const userAuthMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = verifyToken(token);

    // 3. Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default userAuthMiddleware;
