import { Router } from "express";
import { commentController } from "./comment.controller";
import authMiddleware, { UserRole } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware(UserRole.ADMIN, UserRole.USER), commentController.createComment);
// router.get("/", commentController.getAllComments);
// router.get("/:id", commentController.getCommentById);
// router.patch("/:id", commentController.updateComment);
// router.delete("/:id", commentController.deleteComment);

const commentRouter: Router = router;
export default commentRouter;