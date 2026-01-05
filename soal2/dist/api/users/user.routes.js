import express from "express";
import { getUsers, createUser, getUser, deleteUser } from "./user.handlers.js";
import { checkJson } from "../../middleware/checkJson.js";
const userRoutes = express.Router();
userRoutes.route("/")
    .get(getUsers)
    .post(createUser, checkJson);
userRoutes.route("/:id")
    .get(getUser)
    .delete(deleteUser);
export default userRoutes;
//# sourceMappingURL=user.routes.js.map