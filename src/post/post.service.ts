import type { PostUncheckedCreateInput } from "../../generated/prisma/models";
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

const getAllPostsDB = async () => {
  try {
    const result = await prisma.post.findMany();
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
