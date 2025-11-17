"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
// One small edit to test DB connection
pool.query("SELECT NOW()")
    .then(res => console.log("DB connected:", res.rows[0]))
    .catch(err => console.error("DB connection failed:", err));
app.get("/", (req, res) => {
    res.send("Backend is running! 🎉");
});
app.post("/auth/register", async (req, res) => {
    const { name } = req.body;
    console.log("Registering user cause we in the register api:", name);
    if (!name)
        return res.status(400).json({ error: "Name is required" });
    try {
        // Check if user exists
        const existing = await pool.query("SELECT * FROM auth_table WHERE username = $1", [name]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Insert user
        const result = await pool.query("INSERT INTO auth_table (username) VALUES ($1) RETURNING *", [name]);
        // Insert save state file
        const world_result = await pool.query("INSERT INTO save_state (username, inventory, room, world_state) VALUES ($1, $2, $3, $4)", [name, [], 1, [["Button in Drawer", false], ["Trap Door Visible", false], ["Password Entered", false], ["Trap Door Button Present", false], ["Painting Fallen", false], ["Screwdriver in Tank", false], ["Unscrewed Safe", false], ["First Button on Safe", false], ["Second Button on Safe", false], ["Third Button on Safe", false], ["Key in Safe", false], ["Lightbulb Down", false], ["Lightbulb Clicked", false], ["Lightbulb in Lamp", false], ["Panel on Wall Opened", false], ["Lamp on", false], ["Button in Panel Clicked", false], ["Code in Thermo 1", false], ["Code in Thermo 2", false], ["Code in Thermo 3", false]]]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
app.post("/auth/login", async (req, res) => {
    const { name } = req.body;
    console.log("Logging in user in the login api:", name);
    if (!name)
        return res.status(400).json({ error: "Name is required" });
    try {
        const result = await pool.query("SELECT username FROM auth_table WHERE username = $1", [name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
app.get("/game/inventory", async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query("SELECT inventory FROM save_state WHERE username = $1", [name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Inventory for given user not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
app.post("/game/inventory", async (req, res) => {
    const { name, item } = req.body;
    console.log("Received request body:", req.body);
    try {
        const result = await pool.query(`
      UPDATE save_state
      SET inventory = array_append(COALESCE(inventory, '{}'), $1)
      WHERE username = $2
      RETURNING inventory
      `, [item, name]);
        console.log("Query result:", result.rows); // <--- add this
        console.log("Row count:", result.rowCount); // <--- add this
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
app.get("/game/room", async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query("SELECT room FROM save_state WHERE username = $1", [name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Game for given user not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
app.get("/game/state", async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query("SELECT world_state FROM save_state WHERE username = $1", [name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "World State for given user not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
app.post("/game/save", async (req, res) => {
    const { name, inventory, world_state } = req.body;
    try {
        const result = await pool.query(`
      UPDATE save_state
      SET world_state = $1
      WHERE username = $2
      RETURNING world_state
      `, [world_state, name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        console.log("The database error is ... ", err);
        res.status(500).json({ error: "Database error" });
    }
    try {
        const result = await pool.query(`
      UPDATE save_state
      SET inventory = $1
      WHERE username = $2
      RETURNING inventory
      `, [inventory, name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
