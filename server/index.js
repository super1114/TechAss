require('dotenv').config()
const express = require("express");
const cors = require("cors");

var path = require("path");
const port = 3001;
const app = express();
const axios = require("axios").default;
const config = {
    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
};

app.use(cors());
app.get("/api/businesses", async (req, res) => {
  try {
    const city = req.query.city;
    const term = req.query.term;
    let api = `https://api.yelp.com/v3/businesses/search?location=${city}&limit=50`;
    if(term!="") {
      api+="&term="+term;
    }
    const response = await axios.get(api, config);
    return res.json(response.data);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(3001, () =>
  console.log(`Express server is running on port ${port}`)
);