import type { Request, Response } from "express";

import { postService } from "./post.service";
import type { PostStatus } from "../../generated/prisma/enums";


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
    const search = req.query?.search as string | undefined;
    const tags = req.query?.tags ? (req.query.tags as string).split(",") : [];
    const status = req.query?.status as  PostStatus| undefined;
    const result = await postService.getAllPostsDB({ search, tags, status });
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

const getPostById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; 
    const result = await postService.getPostByIdDB(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        message: "Post not found",
      });
    } 
    res.status(200).json({  
      success: true,
      message: "Post retrieved successfully",
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
  getPostById,

};
