// ============================================================
// Auth Routes - Authentication endpoints
// ⚠️ SENGAJA BUGGY - No rate limiting, info leakage
// ============================================================

import { Router, Request, Response } from "express";
import * as authService from "../services/authService";

export const authRouter = Router();

// Bug: No rate limiting on login endpoint
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Bug: No input validation
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    // Bug: Different error messages reveal user existence
    res.status(500).json({ error: error.message });
  }
});

// Bug: No email verification, no rate limiting
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    // Bug: Weak password check
    if (!authService.validatePassword(password)) {
      res.status(400).json({ error: "Password too short (min 4 chars)" });
      return;
    }

    res.status(201).json({ message: "User created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Bug: Password reset without proper verification
authRouter.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    const result = await authService.resetPassword(email, newPassword);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Bug: Token in query string (appears in logs)
authRouter.get("/verify", async (req: Request, res: Response) => {
  const token = req.query.token as string;
  const decoded = authService.verifyToken(token);

  if (decoded) {
    res.json({ valid: true, user: decoded });
  } else {
    res.status(401).json({ valid: false });
  }
});

// 🔴 Bug: Expose user welcome page with XSS
authRouter.get("/welcome/:username", async (req: Request, res: Response) => {
  const html = authService.generateWelcomeHtml(req.params.username);
  res.send(html);
});
