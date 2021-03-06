
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("location_stories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("location_stories").insert([
        { story_id: 1, location_id: 1 },
        { story_id: 2, location_id: 2 },
        { story_id: 3, location_id: 3 },
        { story_id: 4, location_id: 4 },
        { story_id: 5, location_id: 5 },
        { story_id: 6, location_id: 6 },
        { story_id: 7, location_id: 7 },
      ]);
    });
};
