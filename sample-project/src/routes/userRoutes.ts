// ============================================================
// User Routes - API endpoints for user management
// ⚠️ SENGAJA BUGGY - No validation, no auth middleware
// ============================================================

import { Router, Request, Response } from "express";
import * as userService from "../services/userService";

export const userRouter = Router();

// Bug: No authentication middleware
// Bug: No input validation
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    // Bug: Directly passing user input to service (SQL injection chain)
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error: any) {
    // Bug: Leaking error details
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Bug: No pagination, returns ALL users
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.searchUsers(
      req.query.name as any,
      req.query.email as any
    );
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Bug: No validation on request body
userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    console.log("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Bug: No authorization - anyone can update any user
userRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Bug: No authorization - anyone can delete any user
// Bug: No soft delete - permanent deletion
userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted", result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Bug: Debug endpoint left in production code
userRouter.get("/debug/all", async (req: Request, res: Response) => {
  const connection = (await import("../config/database")).getConnection();
  connection.query("SELECT * FROM users", (err, results) => {
    // Bug: Expose all user data including passwords
    res.json(results);
  });
});
