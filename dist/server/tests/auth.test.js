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
const rawKnexConfig = __importStar(require("../../knexfile")); // works with TS/JS knexfile
// Normalize the import so it works whether the knexfile uses `export default` (ESM)
// or `module.exports` (CommonJS). Some environments (ts-jest) need
// `esModuleInterop: true` to allow default imports from CommonJS modules.
const knexConfig = rawKnexConfig.default ?? rawKnexConfig;
const knex = (0, knex_1.default)(knexConfig.development);
describe("Auth Table", () => {
    // 🔹 Before each test: clean out the inventory table
    beforeEach(async () => {
        await knex("auth_table").del();
    });
    // 🔹 After all tests: close DB connection so Jest can exit cleanly
    afterAll(async () => {
        await knex.destroy();
    });
    test("can insert a username into auth table", async () => {
        // 🔹 Insert a new row into the auth table
        const inserted = await knex("auth_table")
            .insert({
            id: 1,
            username: "test_user",
        })
            .returning(["id", "username"]);
        // "inserted" will be an array of objects from PostgreSQL
        const item = inserted[0];
        // 🔹 Assert that the returned row looks correct
        expect(item).toMatchObject({
            id: 1,
            username: "test_user",
        });
        // 🔹 Fetch directly from DB to double check
        const fetched = await knex("auth_table").where({ username: "test_user" }).first();
        expect(fetched).toMatchObject({
            id: 1,
            username: "test_user",
        });
    });
});
