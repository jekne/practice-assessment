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

module.exports = router;
