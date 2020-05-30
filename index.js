const bookPredict = require("./components/bookPredictGet.js");

const input = document.querySelectorAll("input");
console.log(input);
input.forEach((item) => item.addEventListener("change", displayBooks));

async function displayBooks(e) {
  let bookArray = await bookPredict.getBookArray(e.target.value);

  for (let i = 0; i < 3; i++) {
    let title = document.createElement("p");
    title.setAttribute("class", `title title-${i}`);
    title.innerHTML = bookArray[i].title;
    let author = document.createElement("p");
    author.setAttribute("class", `author author-${i}`);
    author.innerHTML = bookArray[i].authors[0];
    let image = document.createElement("img");
    image.setAttribute("src", `${bookArray[i].imageLinks.thumbnail}`);
    let parent = document.querySelector(`.book-input__${e.target.id}`);
    parent.appendChild(title);
    parent.appendChild(author);
    parent.appendChild(image);
  }
}
