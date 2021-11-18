import express from "express";
import auth from "../middlewares/auth.js";
import {
  getPosts,
  getPostsBySearch,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js"; //we have to write module-name.js

const routerPosts = express.Router();

routerPosts.get("", getPosts);
routerPosts.get("/search", getPostsBySearch);
routerPosts.get("/:postId", getPostById);
routerPosts.post("", auth, createPost);
routerPosts.put("", auth, updatePost);
routerPosts.delete("", auth, deletePost);
routerPosts.put("/likePost", auth, likePost);

export default routerPosts;
