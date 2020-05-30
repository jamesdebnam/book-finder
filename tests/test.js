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

test("getBookArray should return an array", async (t) => {
  t.plan(1);
  try {
    let returnVal = await bookPredict.getBookArray("harry");
    let actual = Object.prototype.toString.call(returnVal);
    let expected = "[object Array]";
    t.equal(actual, expected);
  } catch (e) {
    t.fail("fail");
  }
  t.end();
});

test("getBookArray should return an array with 3 items", async (t) => {
  t.plan(1);
  try {
    let returnVal = await bookPredict.getBookArray("harry");
    let actual = returnVal.length;
    let expected = 3;
    t.equal(actual, expected);
  } catch (e) {
    t.fail("fail");
  }
  t.end();
});
