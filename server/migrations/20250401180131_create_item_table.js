/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', (table) => {
    table.increments('id')
    table.integer('user_id')
    table.foreign('user_id').references('user.id').onDelete('CASCADE')
    table.string('item_name', 200)
    table.string('description', 200)
    table.integer('quantity', 200)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', (table) => {
    table.dropForeign('user_id')
})
    .then(function() {
        return knex.schema.dropTableIfExists('item');
      })
};
