const test = require("tape");
const book = require("./index.js");

test("testing tape is working", (t) => {
  t.equal(1, 1, "One should equal one");
  t.end();
});

test("bookPredictGet should return a successful network request", (t) => {
  let actual = typeof book.bookPredictGet("catcher");
  let expected = Object;
  t.equal(actual, expected);
});
