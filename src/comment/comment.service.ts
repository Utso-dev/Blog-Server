import type { commentUncheckedCreateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

const createCommentDB = async (commentData: commentUncheckedCreateInput) => {

    const post = await prisma.post.findUnique({
      where: {
        id: commentData.postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    if (commentData.parentId) {
      const parentIdComment = await prisma.comment.findUnique({
        where: {
          id: commentData.parentId as string,
        },
      });

      if (!parentIdComment) {
        throw new Error("Parent comment not found");
      }
    }

    const result = await prisma.comment.create({
      data: commentData,
    });

    return result;
 
};

export const commentService = {
  createCommentDB,
};