import type { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {

  try {
    const postData = {
      ...req.body,
      authorId: req.user?.id,
    };
    const result = await postService.postCreateDB(postData);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await postService.getAllPostsDB();
    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const postController = {
  createPost,
  getAllPosts,
};
