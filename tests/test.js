const test = require("tape");
const bookPredict = require("../components/bookPredictGet.js");
// const index = require("../index.js");

test("testing tape is working", (t) => {
  t.equal(1, 1, "One should equal one");
  t.end();
});

test("bookPredictGet should return a successful network request", (t) => {
  let actual = typeof bookPredict.bookPredictGet("catcher");
  let expected = "object";
  t.equal(actual, expected);
  t.end();
});

test("getBookArray should return an array", (t) => {
  let actual = Object.prototype.toString.call(
    bookPredict.getBookArray("harry")
  );
  let expected = "[object Array]";
  t.equal(actual, expected);
  t.end();
});

// test("getBookArray should return an array with 3 items", (t) => {
//   let actual = bookPredict.getBookArray("harry").length;
//   let expected = 3;
//   t.equal(actual, expected);
//   t.end();
// });
