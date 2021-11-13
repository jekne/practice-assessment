const { Router } = require("express");
const express = require("express");
const Story = require("../models/").story;
const Space = require("../models/").space;
const User = require("../models/").user;
const router = new Router();
const { PORT } = require("../config/constants");
const authMiddleware = require("../auth/middleware");

//find all the the storys  ✗ http -v GET :4000/stories/3
router.get("/", async (req, res, next) => {
  try {
    const storys = await Story.findAll();
    console.log("this is my storys", storys);

    if (storys.length > 0) {
      res.status(200).send(storys);
    } else {
      res.status(404).send("No storys found");
    }
  } catch (error) {
    next(error);
  }
});
//// http://localhost:4000/3/story
//Insert a new story
// http -v POST :4000/stories name=jojo content=ojo@joj imageUrl=123456 spaceId=9
router.post("/:spaceId/story", authMiddleware, async (req, res, next) => {
  try {
    const spaceId = req.params.spaceId;
    const { name, content, imageUrl } = req.body;
    // const space_id = req.space.id;

    if (!name || !content || !imageUrl || !spaceId) {
      res
        .status(400)
        .send(
          "Missing parameters. Please provide the name, content, imageUrl, and spaceId of the space."
        );
    } else {
      const storyExists = await Story.findByPk(spaceId);

      if (!storyExists) {
        res.status(404).send("story with the id provided does not exist.");
      } else {
        const newStory = await Story.create({
          name,
          content,
          imageUrl,
          spaceId,
        });

        if (!newStory) {
          res.status(400).send("Something went wrong");
        } else {
          res.status(200).send({ message: "new story posted", newStory });
        }
      }
    }
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});
//http -v DELETE :4000/stories/10
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const story = await Story.findByPk(id);

    await story.destroy();

    res.send({ message: "success", storyId: id });
  } catch (e) {
    next(e);
  }
});

//create a new list http -v POST :4000/users/2/lists name=eugenio
router.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const newList = await Story.create({ userId, ...req.body });
      res.json(newList);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
