export async function up(knex) {
  // Change inventory and world_state to array of text
  await knex.schema.alterTable('save_state', (table) => {
    table.specificType('inventory', 'text[]').alter();
    table.specificType('world_state', 'text[]').alter();
  });
}

export async function down(knex) {
  // Rollback: convert them back to plain text (or whatever they were before)
  await knex.schema.alterTable('save_state', (table) => {
    table.text('inventory').alter();
    table.text('world_state').alter();
  });
}
