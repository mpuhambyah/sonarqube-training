// ============================================================
// SonarQube Training - Sample Buggy Project
// File: app.ts - Main Express application
// 
// ⚠️ FILE INI SENGAJA BERISI BANYAK BUG & BAD PRACTICE
// Tujuannya untuk latihan scanning dengan SonarQube
// ============================================================

import express from "express";
import { userRouter } from "./routes/userRoutes";
import { productRouter } from "./routes/productRoutes";
import { authRouter } from "./routes/authRoutes";

const app = express();

// Bug: No helmet, no cors, no rate limiting
app.use(express.json());

// Bug: CORS wildcard - terlalu permissive
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

// Bug: Error handler yang expose stack trace
app.use((err: any, req: any, res: any, next: any) => {
  console.error("ERROR:", err);
  res.status(500).json({
    error: err.message,
    stack: err.stack,  // Security: expose stack trace ke client
    internalDetails: err  // Security: expose semua error details
  });
});

// Bug: Hardcoded port, no graceful shutdown
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
