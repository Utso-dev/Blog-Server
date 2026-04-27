import { Router } from "express";
import authMiddleware, { UserRole } from "../middleware/authMiddleware";
import { postController } from "./post.controller";

const router = Router();

router.post("/", authMiddleware(UserRole.USER), postController.createPost);
router.get("/", postController.getAllPosts);

const postRouter: Router = router;
export default postRouter;
