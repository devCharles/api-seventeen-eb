const postsRouter = require("./posts");
const usersRouter = require("./users");
const authRouter = require("./auth");

const apiRouter = (app) => {
    app.use("/api/v1/posts", postsRouter);
    app.use("/api/v1/users", usersRouter);
    app.use("/api/v1/auth",authRouter);
}

module.exports = apiRouter;