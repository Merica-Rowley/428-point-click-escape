exports.up = function(knex) {
  return knex.schema.createTable('save_state', (table) => {
    table.string('username').primary();
    table.integer('room').notNullable().defaultTo(1);
    // inventory: array of strings
    table.specificType('inventory', 'text[]');
    // world_state: JSONB array of objects
    table.specificType('world_state', []);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('save_state');
};

