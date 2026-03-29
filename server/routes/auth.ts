import { RequestHandler } from "express";

// Simple in-memory user storage (in production, use a database)
const users: Map<string, { id: string; name: string; email: string; password: string }> = new Map();

// Simple token generation (in production, use JWT)
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

export const handleSignup: RequestHandler = (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  // Check if user exists
  for (const user of users.values()) {
    if (user.email === email) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }
  }

  // Create user
  const userId = `user_${Date.now()}`;
  users.set(userId, { id: userId, name, email, password });

  // Generate token
  const token = generateToken(userId);

  res.status(201).json({
    message: "User created successfully",
    token,
    user: { id: userId, name, email },
  });
};

export const handleLogin: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  // Find user
  let user = null;
  let userId = "";
  for (const [id, u] of users.entries()) {
    if (u.email === email) {
      user = u;
      userId = id;
      break;
    }
  }

  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // Generate token
  const token = generateToken(userId);

  res.status(200).json({
    message: "Login successful",
    token,
    user: { id: userId, name: user.name, email: user.email },
  });
};

export const handleGetProfile: RequestHandler = (req, res) => {
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

  const user = users.get(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email },
  });
};
