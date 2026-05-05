import express from "express";
import { authenticate } from "../auth/auth.js";
import { validateRegistration, validatePost, apiLimiter } from "../middleware/middleware.js";

import { register, login, refreshToken } from "../services/authService.js";
import { createPost, getPosts, updatePost, deletePost, getTrendingPosts } from "../services/postService.js";
import { addComment } from "../services/commentService.js";

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", apiLimiter, login);
router.post("/refresh-token", refreshToken);

router.post("/posts", authenticate, validatePost, createPost);
router.get("/posts", getPosts);
router.put("/posts/:id", authenticate, validatePost, updatePost);
router.delete("/posts/:id", authenticate, deletePost);

router.post("/posts/:id/comments", authenticate, addComment);

router.get("/trending", getTrendingPosts);

export default router;
