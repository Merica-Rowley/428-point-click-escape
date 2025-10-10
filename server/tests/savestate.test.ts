import knexModule, { Knex } from "knex";
import * as rawKnexConfig from "../../knexfile"; // works with TS/JS knexfile

// Normalize the import so it works whether the knexfile uses `export default` (ESM)
// or `module.exports` (CommonJS). Some environments (ts-jest) need
// `esModuleInterop: true` to allow default imports from CommonJS modules.
const knexConfig: any = (rawKnexConfig as any).default ?? rawKnexConfig;

const knex: Knex = knexModule(knexConfig.development);

describe("Save_State Table", () => {
  // 🔹 Before each test: clean out the inventory table
  beforeEach(async () => {
    await knex("save_state").del();
  });

  // 🔹 After all tests: close DB connection so Jest can exit cleanly
  afterAll(async () => {
    await knex.destroy();
  });

  test("can insert and fetch a save_state item", async () => {
    // 🔹 Insert a new row into the inventory table
    const inserted = await knex("save_state")
      .insert({
        room: "A very scary room",
        inventory: "Lotsa stuff",
        world_state: "A tragic one",
      })
      .returning(["room", "inventory", "world_state"]);

    // "inserted" will be an array of objects from PostgreSQL
    const item = inserted[0];

    // 🔹 Assert that the returned row looks correct
    expect(item).toMatchObject({
      room: "A very scary room",
      inventory: "Lotsa stuff",
      world_state: "A tragic one",
    });

    // 🔹 Fetch directly from DB to double check
    const fetched = await knex("save_state").where({ room: "A very scary room" }).first();

    expect(fetched).toMatchObject({
      room: "A very scary room",
      inventory: "Lotsa stuff",
      world_state: "A tragic one",
    });
  });
});