/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {first_name: 'Chad', last_name: 'Alphason', username: 'thechadman', password: 'donteventhinkabouthackingme'},
    {first_name: 'Heinz', last_name: 'Doofenshmirtz', username: 'something-inator', password: 'curseyouperrytheplatypus'},
    {first_name: 'Xena', last_name: 'Bobeena', username: 'z', password: 'supacoolweinerdog'},
  ]);
};
