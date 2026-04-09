// ============================================================
// Database Configuration
// ⚠️ SENGAJA BUGGY - Hardcoded credentials, no connection pooling
// ============================================================

import mysql from "mysql2";

// 🔴 Security: Hardcoded database credentials
const DB_HOST = "localhost";
const DB_USER = "root";
const DB_PASSWORD = "root123";
const DB_NAME = "training_db";

// Bug: No connection pooling, create new connection every time
export function getConnection() {
  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
  return connection;
}

// Bug: Fungsi yang tidak pernah dipakai (dead code)
export function getTestConnection() {
  const connection = mysql.createConnection({
    host: "test-server",
    user: "test",
    password: "test123",
    database: "test_db",
  });
  return connection;
}

// Bug: Hardcoded API keys
export const CONFIG = {
  JWT_SECRET: "super-secret-key-12345",
  API_KEY: "sk-1234567890abcdef",
  ENCRYPTION_KEY: "my-encryption-key-do-not-share",
  ADMIN_PASSWORD: "admin@123",
  
  // Bug: Magic numbers
  SESSION_TIMEOUT: 86400000,
  MAX_RETRIES: 3,
  CACHE_TTL: 300000,
};

// Bug: Console.log credentials
console.log("Database config loaded:", DB_HOST, DB_USER, DB_PASSWORD);
