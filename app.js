const express = require("express");

const app = express();

const PORT = process.env.PORT||3000;

const bodyParser = require("body-parser");

const cors = require("cors");

const furnitureData = require("./routes/furnitureData");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/furnitureData", furnitureData);

app.get("/", (req, res) => {
  res.json({
    document: "FurnitAR",
  });
});

//Listen on port:
app.listen(PORT);
console.log('server up');