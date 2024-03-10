import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login to access this resource.");
    }
  
    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedId.id);
    req.user = user;
    next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };