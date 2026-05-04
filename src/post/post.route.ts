import { Router } from "express";
import authMiddleware, { UserRole } from "../middleware/authMiddleware";
import { postController } from "./post.controller";

const router = Router();

router.post("/", authMiddleware(UserRole.ADMIN), postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

const postRouter: Router = router;
export default postRouter;
