/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('save_state', (table) => {
    table.string('username').primary();
    table.string('room');      
    table.string('inventory');
    table.string('world_state');
    table.timestamps(true, true);          // created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('save_state');
};
