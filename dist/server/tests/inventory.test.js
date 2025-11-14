"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const rawKnexConfig = __importStar(require("../../knexfile")); // adjust extension if your knexfile is .ts, or use "../../knexfile.js" if it's .js
// Normalize the import so it works whether the knexfile uses `export default` (ESM)
// or `module.exports` (CommonJS). Some environments (ts-jest) need
// `esModuleInterop: true` to allow default imports from CommonJS modules.
const knexConfig = rawKnexConfig.default ?? rawKnexConfig;
const knex = (0, knex_1.default)(knexConfig.development);
describe("Inventory Table", () => {
    // 🔹 Before each test: clean out the inventory table
    beforeEach(async () => {
        await knex("inventory").del();
    });
    // 🔹 After all tests: close DB connection so Jest can exit cleanly
    afterAll(async () => {
        await knex.destroy();
    });
    test("can insert and fetch an inventory item", async () => {
        // 🔹 Insert a new row into the inventory table
        const inserted = await knex("inventory")
            .insert({
            player_id: 1,
            item_name: "Key",
            quantity: 2,
        })
            .returning(["id", "player_id", "item_name", "quantity"]);
        // "inserted" will be an array of objects from PostgreSQL
        const item = inserted[0];
        // 🔹 Assert that the returned row looks correct
        expect(item).toMatchObject({
            player_id: 1,
            item_name: "Key",
            quantity: 2,
        });
        // 🔹 Fetch directly from DB to double check
        const fetched = await knex("inventory").where({ id: item.id }).first();
        expect(fetched).toMatchObject({
            player_id: 1,
            item_name: "Key",
            quantity: 2,
        });
    });
});
