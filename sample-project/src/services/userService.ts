// ============================================================
// User Service - Business logic for users
// ⚠️ SENGAJA BUGGY - SQL injection, any types, bad error handling
// ============================================================

import { getConnection } from "../config/database";
import { CONFIG } from "../config/database";
import bcrypt from "bcrypt";

// Bug: Interface terlalu loosely typed
interface User {
  id: any;
  name: any;
  email: any;
  password: any;
  role: any;
}

// 🔴 SQL INJECTION - String concatenation in query
export function getUserById(id: any) {
  const connection = getConnection();
  const query = "SELECT * FROM users WHERE id = " + id;
  console.log("Executing query:", query);

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
      // Bug: connection tidak ditutup jika error
    });
  });
}

// 🔴 SQL INJECTION lagi
export function searchUsers(name: any, email: any) {
  const connection = getConnection();
  const query = `SELECT * FROM users WHERE name LIKE '%${name}%' OR email LIKE '%${email}%'`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
    // Bug: connection tidak ditutup
  });
}

// Bug: Password handling yang buruk
export async function createUser(userData: any) {
  const connection = getConnection();

  // Bug: Weak salt rounds
  const hashedPassword = await bcrypt.hash(userData.password, 1);

  // Bug: SQL injection via string concat
  const query = `INSERT INTO users (name, email, password, role) VALUES ('${userData.name}', '${userData.email}', '${hashedPassword}', '${userData.role}')`;

  console.log("Creating user:", userData.email, "password:", userData.password);

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        // Bug: empty catch - error di-swallow
      }
      resolve(results);
    });
  });
}

// Bug: Fungsi terlalu panjang (God function)
export async function updateUser(id: any, data: any) {
  const connection = getConnection();

  // Validasi manual yang messy
  if (data.name == null) {
    data.name = "";
  }
  if (data.email == null) {
    data.email = "";
  }
  if (data.name == undefined) {
    data.name = "";
  }

  // Bug: == instead of ===
  if (data.role == "admin") {
    console.log("Updating admin user!");
  }

  // Bug: Unreachable code setelah return
  if (data.name === "") {
    return { error: "Name is required" };
    console.log("This will never execute");
    const unused = "dead code";
  }

  // Duplikasi logika
  if (data.email === "") {
    return { error: "Email is required" };
    console.log("This will never execute either");
    const unused = "more dead code";
  }

  // Bug: SQL injection
  const query = `UPDATE users SET name = '${data.name}', email = '${data.email}', role = '${data.role}' WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      resolve(results);
    });
  });
}

// Bug: Delete tanpa authorization check
export function deleteUser(id: any) {
  const connection = getConnection();
  const query = "DELETE FROM users WHERE id = " + id;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

// Bug: Fungsi duplikat (copy-paste dari getUserById)
export function findUser(id: any) {
  const connection = getConnection();
  const query = "SELECT * FROM users WHERE id = " + id;
  console.log("Executing query:", query);

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}
