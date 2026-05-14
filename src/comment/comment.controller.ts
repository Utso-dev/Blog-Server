import type { Request, Response } from "express";
import { customPagination } from "../helper/helper.pagination";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const commentData = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.body.authorId = userId;

    const result = await commentService.createCommentDB(commentData);
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
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

const commentGetByPostIdDB = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }
    const result = await commentService.commentGetByPostIdDB(postId as string);
    res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
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

const getAuthorComments = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const search = req.query.search as string | undefined;
    const { page, limit, orderByField, orderDirectionValue, skip } =
      customPagination(req.query);
    const result = await commentService.getAuthorCommentsDB({
      authorId: userId,
      search,
      page,
      limit,
      orderByField,
      orderDirectionValue,
      skip,
    });
    res.status(200).json({
      success: true,
      message: "Author comments retrieved successfully",
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

const getCommentById = async (req: Request, res: Response) => {
  try {
    const id = req.params.commentId as string;
    const result = await commentService.getCommentByIdDB(id);
    res.status(200).json({
      success: true,
      message: "Comment retrieved successfully",
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
const updateComment = async (req: Request, res: Response) => {
 try {
  const commentId = req.params.commentId as string;
  const updateData = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const result = await commentService.updateCommentDB(commentId, updateData, userId);
  res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
 } catch (error: unknown) {
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: (error as Error).message,
  });
 }
}

export const commentController = {
  createComment,
  commentGetByPostIdDB,
  getAuthorComments,
  getCommentById,
  updateComment,
};
