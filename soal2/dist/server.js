import express from "express";
import userRoutes from "./api/users/user.routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
app.get("/", (_req, res) => {
    return res.json({
        success: true,
        message: "This is User API",
    });
});
app.use("/user", userRoutes);
app.listen(port, () => {
    console.log(`Server started http://127.0.0.1:${port}`);
});
//# sourceMappingURL=server.js.map