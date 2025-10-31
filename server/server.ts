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
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT NOW()")
  .then(res => console.log("DB connected:", res.rows[0]))
  .catch(err => console.error("DB connection failed:", err));

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running! 🎉");
});

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name } = req.body;

  console.log("Registering user cause we in the register api:", name);

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

    // Insert save state file
    const world_result = await pool.query(
      "INSERT INTO save_state (username, inventory, room, world_state) VALUES ($1, $2, $3, $4)",
      [name, [], 1, []]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/auth/login", async (req: Request, res: Response) => {
  const { name } = req.body;

  console.log("Logging in user in the login api:", name);

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

app.post("/game/inventory", async (req: Request, res: Response) => {
  const { name, item } = req.body;
  try {
    const result = await pool.query(
      "UPDATE save_state SET inventory = array_append(inventory, $1) WHERE username = $2 RETURNING inventory",
      [item, name]
    );

    console.log("Query result:", result.rows); // <--- add this
    console.log("Row count:", result.rowCount); // <--- add this

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});