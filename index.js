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
    image.setAttribute("class", "cover");
    let bookCard = document.createElement("div");
    let inputParent = document.querySelector(`.book-input__${e.target.id}`);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(image);
    inputParent.appendChild(bookCard);
    bookCard.setAttribute("class", "book-card");
    setTimeout(() => {
      bookCard.setAttribute("class", `book-card--active`);
    }, 10);
  }
}
