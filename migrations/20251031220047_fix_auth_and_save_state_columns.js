/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  // 1. Make auth_table.id auto-increment
  const fixAuthTable = knex.raw(`
    ALTER TABLE auth_table
    ALTER COLUMN id
    ADD GENERATED ALWAYS AS IDENTITY;
  `);

  // 2. Convert save_state.inventory to TEXT[]
  const fixInventory = knex.raw(`
    ALTER TABLE save_state
    ALTER COLUMN inventory
    TYPE TEXT[]
    USING CASE
      WHEN inventory IS NULL THEN '{}'
      WHEN inventory LIKE '{%' THEN inventory::TEXT[]
      ELSE string_to_array(inventory, ',')
    END;
  `);

  // 3. Convert save_state.world_state to TEXT[]
  const fixWorldState = knex.raw(`
    ALTER TABLE save_state
    ALTER COLUMN world_state
    TYPE TEXT[]
    USING CASE
      WHEN world_state IS NULL THEN '{}'
      WHEN world_state LIKE '{%' THEN world_state::TEXT[]
      ELSE string_to_array(world_state, ',')
    END;
  `);

  // Return a single promise so Knex waits for all
  return Promise.all([fixAuthTable, fixInventory, fixWorldState]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  const revertInventory = knex.raw(`
    ALTER TABLE save_state
    ALTER COLUMN inventory TYPE TEXT USING array_to_string(inventory, ',');
  `);

  const revertWorldState = knex.raw(`
    ALTER TABLE save_state
    ALTER COLUMN world_state TYPE TEXT USING array_to_string(world_state, ',');
  `);

  const revertAuthTable = knex.raw(`
    ALTER TABLE auth_table
    ALTER COLUMN id
    DROP IDENTITY IF EXISTS;
  `);

  return Promise.all([revertInventory, revertWorldState, revertAuthTable]);
};


