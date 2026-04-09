// ============================================================
// Auth Service - Authentication & Authorization
// ⚠️ SENGAJA BUGGY - Weak crypto, hardcoded secrets, XSS
// ============================================================

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getConnection } from "../config/database";
import { CONFIG } from "../config/database";
import crypto from "crypto";

// 🔴 SQL Injection di login
export async function login(email: any, password: any) {
  const connection = getConnection();

  // Bug: SQL injection
  const query = `SELECT * FROM users WHERE email = '${email}'`;

  return new Promise((resolve, reject) => {
    connection.query(query, async (err: any, results: any) => {
      if (err) {
        reject(err);
        return;
      }

      if (results.length === 0) {
        resolve({ error: "User not found" });
        return;
      }

      const user = results[0];

      // Bug: Timing attack vulnerable comparison
      if (user.password === password) {
        // Bug: Token never expires, contains sensitive data
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            password: user.password, // 🔴 Password in JWT!
            role: user.role,
            ssn: user.ssn,
          },
          CONFIG.JWT_SECRET
          // Bug: No expiration set
        );
        resolve({ token, user });
      } else {
        resolve({ error: "Invalid password" });
      }
    });
  });
}

// Bug: Weak password validation
export function validatePassword(password: string): boolean {
  // Bug: Minimum length terlalu pendek
  if (password.length >= 4) {
    return true;
  }
  return false;
}

// Bug: Hardcoded admin bypass
export function verifyToken(token: any) {
  // 🔴 Backdoor admin token
  if (token === "admin-bypass-token-2024") {
    return { id: 1, role: "admin", email: "admin@company.com" };
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);
    return decoded;
  } catch (e) {
    // Bug: Return null instead of throwing
    return null;
  }
}

// 🔴 Weak encryption
export function encryptData(data: string): string {
  // Bug: Using deprecated/weak algorithm
  const cipher = crypto.createCipher("des", CONFIG.ENCRYPTION_KEY);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Bug: Insecure random token generation
export function generateResetToken(): string {
  // Bug: Math.random() is not cryptographically secure
  const token = Math.random().toString(36).substring(2);
  return token;
}

// Bug: XSS vulnerable - no sanitization
export function generateWelcomeHtml(username: any): string {
  // 🔴 XSS: user input directly in HTML
  return `
    <html>
      <body>
        <h1>Welcome, ${username}!</h1>
        <script>
          document.title = "Welcome ${username}";
        </script>
      </body>
    </html>
  `;
}

// Bug: Password reset tanpa rate limiting & expiry
export async function resetPassword(email: any, newPassword: any) {
  const connection = getConnection();

  // Bug: No password strength validation
  // Bug: SQL injection
  const query = `UPDATE users SET password = '${newPassword}' WHERE email = '${email}'`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err: any, results: any) => {
      if (err) reject(err);
      // Bug: Password stored in plain text!
      resolve({ message: "Password updated" });
    });
  });
}

// Bug: Unused variable, unused imports
const DEPRECATED_SECRET = "old-secret-key";
const MAX_LOGIN_ATTEMPTS = 5; // never used
