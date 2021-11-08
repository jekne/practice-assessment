const { Router } = require("express");
const express = require("express");
const Space = require("../models/").space;

const router = new Router();
const { PORT } = require("../config/constants");

//find all the the spaces  ✗ http -v GET :4000/spaces/3
router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    console.log("this is my spaces", spaces);

    if (spaces.length > 0) {
      res.status(200).send(spaces);
    } else {
      res.status(404).send("No spaces found");
    }
  } catch (error) {
    next(error);
  }
});

// create a new space
// http -v POST :4000/spaces title=jojo description=ojo@joj backgroundColor=white color=green userId=1
router.post("/", async (req, res, next) => {
  try {
    const { title, description, backgroundColor, color, userId } = req.body;

    if (!title || !description || !backgroundColor || !color || !userId) {
      res
        .status(400)
        .send(
          "Missing parameters. Please provide the title, description, backgroundColor, and userId of the space."
        );
    } else {
      const spaceExists = await Space.findByPk(userId);

      if (!spaceExists) {
        res.status(404).send("space with the id provided does not exist.");
      } else {
        const newSpace = await Space.create({
          title,
          description,
          backgroundColor,
          color,
          userId,
        });

        if (!newSpace) {
          res.status(400).send("Something went wrong");
        } else {
          res.status(200).send(newSpace);
        }
      }
    }
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

//http -v DELETE :4000/spaces/10
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const space = await Space.findByPk(id);

    await space.destroy();

    res.send({ message: "success", spaceId: id });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
