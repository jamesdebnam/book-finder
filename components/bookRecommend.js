const axios = require("axios");
const APIKEY = require("./APIKEY.js");

//Submits a GET request to tastedive API, to give back recommended books from search term
async function bookRecommendGet(books) {
  let reply = await axios.get(
    "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar",
    {
      params: {
        q: books,
        k: APIKEY.APIKEY,
        type: "books",
        limit: 10,
      },
    }
  );
  return reply;
}

//Takes the first 3 books, and puts all their info into an array
async function getBookArray(text) {
  let reply = await bookRecommendGet(text);
  let bookArr = [];
  for (let i = 0; i < 10; i++) {
    if (reply.data.Similar.Results[i])
      bookArr.push(reply.data.Similar.Results[i].Name);
  }
  console.log(bookArr);
  return bookArr;
}

module.exports.bookRecommendGet = bookRecommendGet;
module.exports.getBookArray = getBookArray;
