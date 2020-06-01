const bookPredict = require("./components/bookPredictGet.js");

const input = document.querySelectorAll("input");

input.forEach((item) => item.addEventListener("change", displayBooks));

async function displayBooks(e) {
  //Grabs info from google books API
  let bookArray = await bookPredict.getBookArray(e.target.value);
  let displayedBooks = Array.from(
    document.querySelector(`.book-input__${e.target.id}`).children
  );
  if (displayedBooks.length > 0) {
    displayedBooks.forEach((item) => {
      item.remove();
    });
  }

  for (let i = 0; i < 3; i++) {
    //Create all the necessary elements for each card
    let title = document.createElement("p");
    title.className = `title title-${i}`;
    title.innerHTML = bookArray[i].title;
    let author = document.createElement("p");
    author.className = `author author-${i}`;
    author.innerHTML = bookArray[i].authors[0];
    let image = document.createElement("img");
    image.setAttribute("src", `${bookArray[i].imageLinks.thumbnail}`);
    image.className = "cover";

    //Selects the ul element that the cards are going to be appended onto
    let inputParent = document.querySelector(`.book-input__${e.target.id}`);
    let bookCard = document.createElement("li");

    //Appends all the created elements into the li element and fits that into the DOM
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(image);
    inputParent.appendChild(bookCard);

    //Sets attributes twice - this is to get the CSS transition working
    bookCard.className = "book-card";
    setTimeout(() => {
      bookCard.className = `book-card--active book-card__book${i}`;
    }, 10);
    bookCard.addEventListener("click", selectBook);
  }
}

function selectBook(e) {
  let bookList = e.target.parentElement.childNodes;
  //First sets all the unselected cards as book-card to enable animation
  for (let i = 0; i < bookList.length; i++) {
    if (bookList[i].className !== e.target.className) {
      bookList[i].className = "book-card";
    }
  }
  //After 1.5 seconds, the DOM elements get removed
  setTimeout(() => {
    for (let i = 0; i < bookList.length; i++) {
      if (bookList[i].className === "book-card") {
        bookList[i].remove();
      }
    }
  }, 1500);
  //Colours the input form a nice green to show you've selected something
  e.target.parentElement.parentElement.childNodes[1].className =
    "input--validated";

  if (formsFilledCheck()) showButton();
}

function formsFilledCheck() {
  for (item of input) {
    if (item.className !== "input--validated") return false;
  }
  return true;
}

function showButton() {
  let button = document.createElement("button");
  button.className = "form-submit";
  button.innerHTML = "Find me a book!";
  document.querySelector("body").appendChild(button);
  setTimeout(() => {
    button.className = "form-submit form-submit--active";
  }, 1000);
}
