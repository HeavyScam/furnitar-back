const express = require("express");
const router = express.Router();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const fs = require("fs");

const RESPONSE_SHEET_ID = "1Bo-syLS0csDbqM-fdh66rWgrljnvS6pxJRd2kN_ht-s";
const doc = new GoogleSpreadsheet(RESPONSE_SHEET_ID);
const CREDENTIALS = JSON.parse(
  fs.readFileSync("furnitar-332710-646f576c7040.json")
);

const getRow = async (l, b, h, type) => {
  await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });
  await doc.loadInfo();
  let sheet = doc.sheetsByIndex[0];
  let rows = await sheet.getRows();
  var arr = [];
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    if (
      row.product_type === type &&
      row.length <= l &&
      row.breadth <= b &&
      row.height <= h
    ) {
      // console.log("---------------");
      // console.log(row.product_name);
      // console.log(row.length);
      // console.log(row.breadth);
      // console.log(row.height);
      // console.log(row.product_url);
      // console.log(row.product_selection1);
      // console.log(row.product_selection2);
      // console.log(row.product_type);
      // console.log("---------------");
      const obj = {
        length: row.length,
        width: row.breadth,
        height: row.height,
        product_name: row.product_name,
        product_url: row.product_url,
        price: row.product_selection1,
        image_url: row.product_selection2,
      };
      arr.push(obj);
    }
  }
  return arr;
};

router.post("/", async (req, res) => {
  let length = req.body.length,
    width = req.body.width,
    height = 5000;
  console.log(req.body.length);
  if (!req.body.length && !req.body.width && !req.body.category) {
    res.send({ message: "Incomplete params" });
    return;
  }
  if (req.body.height != null) height = req.body.height;
  let ar = await getRow(length, width, height, req.body.category);
  res.status(200).send(ar);
});

module.exports = router;
