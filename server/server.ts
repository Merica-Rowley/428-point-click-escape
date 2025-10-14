import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Pool } from "pg";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: "postgresql://postgres:curr_password@localhost:5432/escape_game" // or manual host/user/password
}) as unknown as { query: (text: string, params?: any[]) => Promise<any> };

// ✅ Register new user
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

app.post("/auth/login", async (req: Request, res: Response) => {
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

app.listen(3001, () => console.log("Server running on http://localhost:3001"));