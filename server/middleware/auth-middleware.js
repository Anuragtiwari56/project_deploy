import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Token not provided or invalid format." });
    }

    // Remove 'Bearer' prefix
    const jwtToken = authHeader.replace("Bearer", "").trim();
    console.log("Token received in middleware:", jwtToken);

    // Verify the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRETKEY);
    console.log("Decoded token payload:", isVerified);

    // Fetch user based on token data
    const userData = await User.findOne({ email: isVerified.email }).select("-password");
    if (!userData) {
      return res.status(404).json({ message: "User not found. Invalid token." });
    }
    console.log("Authenticated user:", userData);

    // Attach user details to the request object
    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;

    // Call next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);

    // Check for specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized. Token expired." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    // Generic error fallback
    return res.status(500).json({ message: "Internal server error." });
  }
};
