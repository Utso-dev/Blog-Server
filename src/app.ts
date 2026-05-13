import { toNodeHandler } from "better-auth/node";
import cros from "cors";
import express from "express";
import { auth } from "./lib/auth";
import postRouter from "./post/post.route";
import commentRouter from "./comment/comment.route";
const app = express();
app.use(
  cros({
    origin: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

// post routes
app.use("/api/post", postRouter);
// comment routes
app.use("/api/comment", commentRouter);

// inital root route
app.use("/", (req, res) => {
  res.send("Hello World ");
});



export default app;
