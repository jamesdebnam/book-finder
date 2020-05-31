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
    title.setAttribute("class", `title title-${i}`);
    title.innerHTML = bookArray[i].title;
    let author = document.createElement("p");
    author.setAttribute("class", `author author-${i}`);
    author.innerHTML = bookArray[i].authors[0];
    let image = document.createElement("img");
    image.setAttribute("src", `${bookArray[i].imageLinks.thumbnail}`);
    image.setAttribute("class", "cover");

    //Selects the ul element that the cards are going to be appended onto
    let inputParent = document.querySelector(`.book-input__${e.target.id}`);
    let bookCard = document.createElement("li");

    //Appends all the created elements into the li element and fits that into the DOM
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(image);
    inputParent.appendChild(bookCard);

    //Sets attributes twice - this is to get the CSS transition working
    bookCard.setAttribute("class", "book-card");
    setTimeout(() => {
      bookCard.setAttribute("class", `book-card--active book-card__book${i}`);
    }, 10);
    bookCard.addEventListener("click", selectBook);
  }
}

function selectBook(e) {
  let bookList = e.target.parentElement.childNodes;
  for (let i = 0; i < bookList.length; i++) {
    if (bookList[i].className !== e.target.className) {
      bookList[i].remove();
    }
  }
  // e.target.setAttribute("class", `book-card--active book-card--selected`);
}
