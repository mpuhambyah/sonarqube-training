// ============================================================
// Product Service - Product management
// ⚠️ SENGAJA BUGGY - Code smells, complexity, duplication
// ============================================================

import { getConnection } from "../config/database";

// Bug: Terlalu banyak parameter (long parameter list)
export function createProduct(
  name: any,
  description: any,
  price: any,
  category: any,
  stock: any,
  sku: any,
  weight: any,
  dimensions: any,
  color: any,
  brand: any
) {
  const connection = getConnection();

  // Bug: No input validation at all
  // Bug: SQL injection
  const query = `INSERT INTO products (name, description, price, category, stock, sku, weight, dimensions, color, brand) 
    VALUES ('${name}', '${description}', ${price}, '${category}', ${stock}, '${sku}', ${weight}, '${dimensions}', '${color}', '${brand}')`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

// Bug: High cognitive complexity (nested ifs)
export function calculateDiscount(product: any, user: any, coupon: any) {
  let discount = 0;

  if (product) {
    if (product.category === "electronics") {
      if (user) {
        if (user.role === "premium") {
          if (coupon) {
            if (coupon.type === "percentage") {
              if (coupon.value > 50) {
                discount = 50; // cap at 50%
              } else {
                discount = coupon.value;
              }
            } else {
              if (coupon.value > product.price) {
                discount = product.price;
              } else {
                discount = coupon.value;
              }
            }
          } else {
            discount = 10; // default premium discount
          }
        } else {
          if (coupon) {
            if (coupon.type === "percentage") {
              discount = coupon.value > 30 ? 30 : coupon.value;
            } else {
              discount = coupon.value > product.price ? product.price : coupon.value;
            }
          }
        }
      }
    } else if (product.category === "clothing") {
      if (user) {
        if (user.role === "premium") {
          discount = 15;
        } else {
          discount = 5;
        }
      }
    } else if (product.category === "food") {
      discount = 0; // no discount on food
    } else if (product.category === "books") {
      discount = 2;
    }
  }

  return discount;
}

// Bug: Code duplication - almost identical to calculateDiscount
export function calculateDiscountV2(product: any, user: any, coupon: any) {
  let discount = 0;

  if (product) {
    if (product.category === "electronics") {
      if (user) {
        if (user.role === "premium") {
          if (coupon) {
            if (coupon.type === "percentage") {
              if (coupon.value > 50) {
                discount = 50;
              } else {
                discount = coupon.value;
              }
            } else {
              if (coupon.value > product.price) {
                discount = product.price;
              } else {
                discount = coupon.value;
              }
            }
          } else {
            discount = 10;
          }
        } else {
          if (coupon) {
            if (coupon.type === "percentage") {
              discount = coupon.value > 30 ? 30 : coupon.value;
            } else {
              discount = coupon.value > product.price ? product.price : coupon.value;
            }
          }
        }
      }
    } else if (product.category === "clothing") {
      if (user) {
        if (user.role === "premium") {
          discount = 20; // slightly different value
        } else {
          discount = 5;
        }
      }
    }
  }

  return discount;
}

// Bug: Null dereference potential
export function getProductSummary(product: any) {
  // Bug: No null check - will crash if product is null
  const name = product.name.toUpperCase();
  const price = product.price.toFixed(2);
  const category = product.category.trim();

  // Bug: comparison that's always false
  if (price !== price) {
    return "Invalid price";
  }

  return `${name} - ${category} - $${price}`;
}

// Bug: Regex DOS (ReDoS) vulnerability  
export function validateProductSku(sku: string): boolean {
  // 🔴 ReDoS: catastrophic backtracking possible
  const regex = /^([a-zA-Z]+)+\d+$/;
  return regex.test(sku);
}

// Bug: Infinite loop potential
export function retryOperation(operation: any, maxRetries: any) {
  let attempt = 0;
  let result = null;

  while (result === null) {
    try {
      result = operation();
    } catch (e) {
      attempt++;
      console.log("Retry attempt:", attempt);
      // Bug: No break condition when maxRetries exceeded
      // This can loop forever if operation always throws
    }
  }

  return result;
}
