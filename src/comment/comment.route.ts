import { Router } from "express";
import authMiddleware, { UserRole } from "../middleware/authMiddleware";
import { commentController } from "./comment.controller";

const router = Router();

router.get(
  "/author/",
  authMiddleware(UserRole.ADMIN, UserRole.USER),
  commentController.getAuthorComments,
);
router.get(
  "/:commentId",
  authMiddleware(UserRole.ADMIN, UserRole.USER),
  commentController.getCommentById,
);
router.patch(
  "/:commentId",
  authMiddleware(UserRole.ADMIN, UserRole.USER),
  commentController.updateComment,
);

router.get(
  "/all/:postId",
  authMiddleware(UserRole.ADMIN, UserRole.USER),
  commentController.commentGetByPostIdDB,
);
router.post(
  "/",
  authMiddleware(UserRole.ADMIN, UserRole.USER),
  commentController.createComment,
);
// router.get("/", commentController.getAllComments);
// router.get("/:id", commentController.getCommentById);
// router.patch("/:id", commentController.updateComment);
// router.delete("/:id", commentController.deleteComment);

const commentRouter: Router = router;
export default commentRouter;
