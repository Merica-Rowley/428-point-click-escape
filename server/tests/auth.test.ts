import knexModule, { Knex } from "knex";
import * as rawKnexConfig from "../../knexfile"; // works with TS/JS knexfile
import { id } from "../../jest.config";

// Normalize the import so it works whether the knexfile uses `export default` (ESM)
// or `module.exports` (CommonJS). Some environments (ts-jest) need
// `esModuleInterop: true` to allow default imports from CommonJS modules.
const knexConfig: any = (rawKnexConfig as any).default ?? rawKnexConfig;

const knex: Knex = knexModule(knexConfig.development);

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