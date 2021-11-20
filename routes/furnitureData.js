const express = require("express");

const router = express.Router();

//to do
router.post("/", async (req, res) => {
  res.send({ message: res });
});

module.exports = router;