"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var config = {
    development: {
        client: "pg",
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        },
        migrations: {
            directory: "./migrations",
        },
    },
};
exports.default = config; // 👈 important
// Quick test for commits
