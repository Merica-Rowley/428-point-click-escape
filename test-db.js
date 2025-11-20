import * as dotenv from "dotenv";
dotenv.config();

console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("PASS:", process.env.DB_PASSWORD);
console.log("NAME:", process.env.DB_NAME);
console.log("PORT:", process.env.DB_PORT);
