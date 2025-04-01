/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {user_id: 1, item_name: 'Creatine Monohydrate', description: 'Supports muscle strength, power, and recovery.', quantity: 25},
    {user_id: 1, item_name: 'BCAA Capsules', description: 'Essential amino acids to promote muscle recovery and reduce fatigue.', quantity: 60},
    {user_id: 1, item_name: 'Pre-Workout Powder', description: 'Boosts energy, focus, and endurance for intense workouts.', quantity: 35},
    {user_id: 1, item_name: 'Fish Oil Softgels', description: 'Supports heart health and reduces inflammation in joints.', quantity: 90},
    {user_id: 1, item_name: 'Multivitamin Tablets', description: 'Daily essential vitamins and minerals for overall health and wellness.', quantity: 50},
    {user_id: 1, item_name: 'Electrolyte Powder', description: 'Hydration support with essential minerals for endurance.', quantity: 20},
    {user_id: 1, item_name: 'Mass Gainer', description: 'High-calorie protein blend to help with muscle growth and weight gain.', quantity: 15},
    {user_id: 1, item_name: 'L-Glutamine Powder', description: 'Amino acid supplement for muscle recovery and immune support.', quantity: 30},
    {user_id: 1, item_name: 'Fat Burner Capsules', description: 'Supports metabolism and energy levels to aid weight loss.', quantity: 45},
    {user_id: 1, item_name: 'Collagen Peptides', description: 'Supports skin, joint, and muscle health.', quantity: 55},
    {user_id: 2, item_name: 'Shrink-Inator', description: 'A device that shrinks anything it zaps.', quantity: 3},
    {user_id: 2, item_name: 'Freeze-Inator', description: 'Freezes objects and people instantly with an icy blast.', quantity: 5},
    {user_id: 2, item_name: 'Giant Robot-Inator', description: 'A towering robot designed to take over the Tri-State Area.', quantity: 1},
    {user_id: 2, item_name: 'Age Accelerator-Inator', description: 'Rapidly ages anything it hits, making them older instantly.', quantity: 4},
    {user_id: 2, item_name: 'Mind-Control-Inator', description: 'Allows the user to control the minds of others.', quantity: 2},
    {user_id: 2, item_name: 'Turn-Everything-Evil-Inator', description: 'Transforms normal objects into evil versions of themselves.', quantity: 6},
    {user_id: 2, item_name: 'Time Travel-Inator', description: 'Enables travel to different points in time.', quantity: 1},
    {user_id: 2, item_name: 'Destruct-Inator', description: 'Causes massive destruction to anything in its path.', quantity: 3},
    {user_id: 2, item_name: 'Mustache-Inator', description: 'Gives mustaches to everyone in the Tri-State Area.', quantity: 8},
    {user_id: 2, item_name: 'Sloth-attract-Inator', description: 'Attracts sloths to any given location.', quantity: 7},
    {user_id: 3, item_name: 'Organic Kibble', description: 'High-quality, grain-free food for a healthy pet diet.', quantity: 50},
    {user_id: 3, item_name: 'Chew Toy', description: 'Durable rubber toy designed to keep pets entertained and reduce stress.', quantity: 30},
    {user_id: 3, item_name: 'Cat Scratching Post', description: 'Sturdy post covered in sisal to satisfy cat scratching needs.', quantity: 15},
    {user_id: 3, item_name: 'Aquarium Starter Kit', description: 'Complete set with a tank, filter, and decorations for fish enthusiasts.', quantity: 10},
    {user_id: 3, item_name: 'Bird Seed Mix', description: 'Nutrient-rich blend of seeds for a variety of pet birds.', quantity: 40},
    {user_id: 3, item_name: 'Reptile Heat Lamp', description: 'Provides essential warmth for reptiles in terrariums.', quantity: 20},
    {user_id: 3, item_name: 'Rabbit Hutch', description: 'Spacious wooden enclosure for rabbits and small animals.', quantity: 5},
    {user_id: 3, item_name: 'Pet Shampoo', description: 'Gentle, all-natural shampoo for keeping pets clean and fresh.', quantity: 25},
    {user_id: 3, item_name: 'Dog Leash & Collar Set', description: 'Adjustable, durable leash and collar for safe walks.', quantity: 35},
    {user_id: 3, item_name: 'Hamster Exercise Wheel', description: 'Silent, sturdy wheel for small pets to stay active.', quantity: 18}
    ]);
};
