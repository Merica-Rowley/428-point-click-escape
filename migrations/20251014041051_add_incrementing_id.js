/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw(`
    ALTER TABLE auth_table 
    ALTER COLUMN id 
    ADD GENERATED ALWAYS AS IDENTITY
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw(`
    ALTER TABLE auth_table 
    ALTER COLUMN id DROP IDENTITY IF EXISTS
  `);
};
