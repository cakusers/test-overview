import crypto from "crypto";
import { type QueryError, type ResultSetHeader } from "mysql2/promise";
import type { User } from "./user.types.js";
import type { RequestHandler } from "express";
import { DB } from "../../database/connection.js";

export const createUser: RequestHandler = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body cannot be empty",
    });
  }

  const { name, email, password } = req.body as User;

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  try {
    await DB.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashPassword]
    );

    return res.status(201).json({
      success: true,
      message: "User data successfully created",
    });
  } catch (error) {
    const MysqlError = error as QueryError;
    if (
      MysqlError.code === "ER_DUP_ENTRY" &&
      MysqlError.message.includes("email")
    ) {
      return res.status(400).json({
        success: false,
        message: "Email already taken, please use another email",
      });
    }

    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to created user data",
    });
  }
};

export const getUsers: RequestHandler = async (_req, res) => {
  try {
    const [result] = await DB.query<User[]>(
      "SELECT id, name, email FROM users"
    );

    return res.json({
      sucess: true,
      message: "All users successfully retrieved",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to retrieve all users",
    });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  try {
    const [result] = await DB.query<User[]>(
      "SELECT id, name, email FROM users WHERE users.id = ?",
      [userId]
    );

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const user = result[0];
    return res.json({
      sucess: true,
      message: "User data successfully retrieved",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to retrieve user data",
    });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  try {
    const [result] = await DB.execute<ResultSetHeader>(
      "DELETE FROM users WHERE users.id = ?",
      [userId]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        sucess: false,
        message: `User with id: ${userId} not found`,
      });
    }

    return res.json({
      sucess: true,
      message: "User successfully deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};
