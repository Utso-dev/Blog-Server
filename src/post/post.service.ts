import type { PostStatus } from "../../generated/prisma/enums";
import type {
  PostUncheckedCreateInput,
  PostWhereInput,
} from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

const postCreateDB = async (data: PostUncheckedCreateInput) => {
  try {
    const result = await prisma.post.create({ data });
    return result;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

const getAllPostsDB = async (options: {
  search?: string | undefined;
  tags?: string[] | undefined;
  status?: PostStatus | undefined;
  page: number;
  skip: number;
  limit: number;
  orderByField: string;
  orderDirectionValue: string;
}) => {
  try {
    const searchApply: PostWhereInput[] = [];

    if (options.search) {
      searchApply.push({
        OR: [
          {
            title: {
              contains: options.search as string,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: options.search as string,
              mode: "insensitive",
            },
          },
        ],
      });
    }
    if (options.tags && options.tags.length > 0) {
      searchApply.push({
        tags: {
          hasSome: options.tags,
        },
      });
    }
    if (options.status) {
      searchApply.push({
        status: options.status,
      });
    }

    const result = await prisma.post.findMany({
      where: {
        AND: searchApply,
      },
      skip: options.skip,
      take: options.limit,
      orderBy: {
        [options.orderByField]: options.orderDirectionValue,
      },
    });
    const totalCount = await prisma.post.count({
      where: {
        AND: searchApply,
      },
    });

    const finalResult = {
      data: result,
      pagination: {
        total_item: totalCount,
        total_pages: Math.ceil(totalCount / options.limit),
        current_page: options.page,
        limit: options.limit,
      },
    };

    return finalResult;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

const getPostByIdDB = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data:{
        views: {
          increment: 1,
        },
      }
    })
    
    const post = await tx.post.findUnique({
      where: { id },
    });
    return post;
  });

  return result;
};

export const postService = {
  postCreateDB,
  getAllPostsDB,
  getPostByIdDB,
};
