import type { Prisma } from "../../generated/prisma/client";
import type { commentUncheckedCreateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

type GetAuthorCommentsDBParams = {
  authorId: string;
  page: number;
  limit: number;
  orderByField: string;
  orderDirectionValue: string;
  skip: number;
  search: string | undefined;
};

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

const commentGetByPostIdDB = async (postId: string) => {
  const result = await prisma.comment.findMany({
    where: { postId, parentId: null },
    include: {
      replies: {
        where: { postId },
        include: {
          replies: true,
        },
      },
    },
  });
  return result;
};
const getAuthorCommentsDB = async ({
  authorId,
  page,
  limit,
  orderByField,
  orderDirectionValue,
  skip,
  search,
}: GetAuthorCommentsDBParams) => {
const whereCondition: Prisma.commentWhereInput = {
    authorId,
    ...(search && {
      content: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const result = await prisma.comment.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [orderByField]: orderDirectionValue,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  const totalComments = await prisma.comment.count({
    where: whereCondition,
  });
  const finalResult = {
    data: result,
    pagination: {
      total_item: totalComments,
      current_page: page,
      limit,
      total_pages: Math.ceil(totalComments / limit),
    },
  };
  return finalResult;
};

export const commentService = {
  createCommentDB,
  commentGetByPostIdDB,
  getAuthorCommentsDB,
};
