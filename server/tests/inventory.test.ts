import knexModule, { Knex } from "knex";
import * as rawKnexConfig from "../../knexfile"; // adjust extension if your knexfile is .ts, or use "../../knexfile.js" if it's .js

// Normalize the import so it works whether the knexfile uses `export default` (ESM)
// or `module.exports` (CommonJS). Some environments (ts-jest) need
// `esModuleInterop: true` to allow default imports from CommonJS modules.
const knexConfig: any = (rawKnexConfig as any).default ?? rawKnexConfig;

const knex: Knex = knexModule(knexConfig.development);

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
