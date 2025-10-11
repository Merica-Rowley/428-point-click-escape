/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  // ✅ Return the promise so Knex knows when it's done
  return knex.schema.createTable('inventory', (table) => {
    table.increments('id').primary();      // Auto-increment ID
    table.integer('player_id').notNullable();
    table.string('item_name').notNullable();
    table.integer('quantity').defaultTo(1);
    table.timestamps(true, true);          // created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inventory');
};
