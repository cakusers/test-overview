import type { Request, Response, NextFunction } from "express";

export const checkJson = (req: Request, res: Response, next: NextFunction) => {
  const isJson =
    req.get("Content-Type") === "application/json" ||
    req.get("Content-Type") === "json";

  if (!isJson) {
    return res.status(415).json({
      success: false,
      message: "Request must be JSON (Content-Type: application/json)",
    });
  }

  next();
};
