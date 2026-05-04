import { Router } from "express";
import authMiddleware, { UserRole } from "../middleware/authMiddleware";
import { postController } from "./post.controller";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.post("/", authMiddleware(UserRole.ADMIN), postController.createPost);

const postRouter: Router = router;
export default postRouter;
