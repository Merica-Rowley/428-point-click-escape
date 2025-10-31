/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('save_state', (table) => {
    table.increments('id').primary();      // Auto-increment ID
    table.string('username').notNullable();
    table.string('room').notNullable();      
    table.string('inventory').notNullable();
    table.string('world_state').notNullable();
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
