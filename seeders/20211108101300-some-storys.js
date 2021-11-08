"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("stories", [
      {
        name: "Johann stories",
        content: "this is the johann content",
        imageUrl: "niceimage_url",
        spaceId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mom stories",
        content: "this is my mom content",
        imageUrl: "greatimage_url",
        spaceId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cá stories",
        content: "this is the Cacá content",
        imageUrl: "anotherniceimage_url",
        spaceId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ge stories",
        content: "this is the Ge content",
        imageUrl: "anotherniceimage_url",
        spaceId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
