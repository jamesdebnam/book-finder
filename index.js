const axios = require("axios");
const beefy = require("beefy");
const http = require("http");

async function bookPredictGet(text) {
  let reply = await axios.get("https://www.googleapis.com/books/v1/volumes", {
    params: {
      q: text,
    },
  });
  console.log("sdfsd");
}
const GOOGLEAPI = "AIzaSyCcamJ9cxaZx_NCU4RsG0SdJz1MZyi23GA";

console.log(bookPredictGet("catcher"));

module.exports = bookPredictGet;
