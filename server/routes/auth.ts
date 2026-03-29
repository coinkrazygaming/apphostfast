import { RequestHandler } from "express";
import { query } from "../db/client";

// Simple token generation (in production, use JWT with proper secrets)
function generateToken(userId: string): string {
  return Buffer.from(`${userId}:${Date.now()}`).toString("base64");
}

function verifyToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [userId] = decoded.split(":");
    return userId;
  } catch {
    return null;
  }
}

export const handleSignup: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    // Check if user exists
    const existingUser = await query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    // Create user
    const userId = `user_${Date.now()}`;
    await query(
      "INSERT INTO users (user_id, name, email, password) VALUES ($1, $2, $3, $4)",
      [userId, name, email, password]
    );

    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: userId, name, email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "An error occurred during signup" });
  }
};

export const handleLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    // Find user
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0 || result.rows[0].password !== password) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const user = result.rows[0];
    const token = generateToken(user.user_id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.user_id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

export const handleGetProfile: RequestHandler = async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = verifyToken(token);
  if (!userId) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  try {
    const result = await query("SELECT user_id, name, email FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = result.rows[0];
    res.status(200).json({
      user: { id: user.user_id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
