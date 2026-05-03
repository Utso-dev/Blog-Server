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
    });
    return result;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export const postService = {
  postCreateDB,
  getAllPostsDB,
};
