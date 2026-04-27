import { Router } from "express";
import { postController } from "./post.controller";

const router = Router();

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);

const postRouter: Router = router;
export default postRouter;
