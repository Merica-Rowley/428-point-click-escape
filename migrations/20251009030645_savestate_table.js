exports.up = function(knex) {
  return knex.schema.createTable('save_state', (table) => {
    table.string('username').primary();
    table.string('room');  
    // inventory: array of strings
    table.specificType('inventory', 'text[]').defaultTo('{}');
    // world_state: JSONB array of objects
    table.jsonb('world_state').defaultTo('[]');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('save_state');
};

