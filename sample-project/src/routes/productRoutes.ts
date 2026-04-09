// ============================================================
// Product Routes - API endpoints for products
// ⚠️ SENGAJA BUGGY
// ============================================================

import { Router, Request, Response } from "express";
import * as productService from "../services/productService";

export const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Bug: Destructuring with too many params
    const { name, description, price, category, stock, sku, weight, dimensions, color, brand } = req.body;
    const result = await productService.createProduct(
      name, description, price, category, stock, sku, weight, dimensions, color, brand
    );
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.get("/:id/discount", async (req: Request, res: Response) => {
  try {
    // Bug: Parsing without validation
    const product = { price: parseInt(req.query.price as string), category: req.query.category };
    const user = { role: req.query.role };
    const coupon = req.query.coupon ? JSON.parse(req.query.coupon as string) : null;

    const discount = productService.calculateDiscount(product, user, coupon);
    res.json({ discount });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Bug: Unused route (dead code)
productRouter.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "test endpoint - should be removed" });
});
