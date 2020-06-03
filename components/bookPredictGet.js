const axios = require("axios");

//Submits a GET request to google books API, to give back books from search term
async function bookPredictGet(text) {
  let reply = await axios.get("https://www.googleapis.com/books/v1/volumes", {
    params: {
      q: text,
      filter: "paid-ebooks",
    },
  });
  return reply;
}

//Takes the first 3 books, and puts all their info into an array
async function getBookArray(text) {
  let reply = await bookPredictGet(text);
  let bookArr = [];
  for (let i = 0; i < 3; i++) {
    bookArr.push(reply.data.items[i].volumeInfo);
  }
  // console.log(bookArr);
  return bookArr;
}

module.exports.bookPredictGet = bookPredictGet;
module.exports.getBookArray = getBookArray;
