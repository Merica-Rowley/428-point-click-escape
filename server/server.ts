import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
}) as unknown as { query: (text: string, params?: any[]) => Promise<any> };

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    // Check if user exists
    const existing = await pool.query("SELECT * FROM auth_table WHERE username = $1", [name]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Insert user
    const result = await pool.query(
      "INSERT INTO auth_table (username) VALUES ($1) RETURNING *",
      [name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/auth/login", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    const result = await pool.query("SELECT username FROM auth_table WHERE username = $1", [name]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/game/inventory", async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const result = await pool.query("SELECT inventory FROM save_state WHERE username = $1", [name]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Inventory for given user not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/game/room", async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const result = await pool.query("SELECT room FROM save_state WHERE username = $1", [name]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game for given user not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/game/state", async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const result = await pool.query("SELECT world_state FROM save_state WHERE username = $1", [name]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "World State for given user not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));