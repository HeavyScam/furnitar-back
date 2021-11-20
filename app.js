const express = require("express");
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs')


const RESPONSE_SHEET_ID = '1Bo-syLS0csDbqM-fdh66rWgrljnvS6pxJRd2kN_ht-s';
const doc = new GoogleSpreadsheet(RESPONSE_SHEET_ID);
const CREDENTIALS = JSON.parse(fs.readFileSync('furnitar-332710-646f576c7040.json'))

const getRow = async ()=>{

  await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });
  await doc.loadInfo();
  let sheet = doc.sheetsByIndex[0];
  let rows = await sheet.getRows();
  console.log(rows);
}



const app = express();

const PORT = 3000;

const bodyParser = require("body-parser");

const cors = require("cors");
getRow();
const furnitureData = require("./routes/furnitureData");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/furnitureData", furnitureData);

app.get("/", (req, res) => {
  res.json({
    document: "FurnitAR",
  });
});

//Listen on port:
app.listen(PORT);