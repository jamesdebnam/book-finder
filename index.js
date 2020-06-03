const bookPredict = require("./components/bookPredictGet.js");
const bookRecommend = require("./components/bookRecommend.js");
const button = document.querySelector("button");
const input = document.querySelectorAll("input");
const overlay = document.querySelector(".book-overlay");
let overlayHidden = true;
let loading = false;

input.forEach((item) => item.addEventListener("change", displayBooks));

//Changes enter to a tab function
for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      tabFocus();
    }
  });
}

function tabFocus() {
  let id = document.activeElement.id;
  switch (id) {
    case "book1":
      input[2].focus();
      break;
    case "book2":
      input[0].focus();
      break;
    case "book3":
      input[1].focus();
      break;
  }
}

async function displayBooks(e) {
  //Resets button on change
  if (button.className === "form-submit form-submit--active") {
    button.removeEventListener("click", displayRecommendations);
    button.className = "form-submit";
  }
  //Grabs info from google books API
  overlay.className = "book-overlay";
  button.className = "form-submit";

  //Removes all recommended books
  let outputBooks = document.querySelector(".book-output");
  if (outputBooks.childElementCount > 0) {
    let outputList = outputBooks.childNodes;
    for (let i = outputList.length - 1; i >= 0; i--) {
      outputList[i].remove();
    }
  }
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
    title.innerHTML = `<b>${bookArray[i].title}</b>`;
    let author = document.createElement("p");
    author.className = `author author-${i}`;
    if (bookArray[i].authors) {
      author.innerHTML = `<i>${bookArray[i].authors[0]}</i>`;
    } else {
      author.innerHTML = "Unknown";
    }
    let image = document.createElement("img");
    if (bookArray[i].imageLinks) {
      image.setAttribute("src", `${bookArray[i].imageLinks.thumbnail}`);
    } else {
      image.setAttribute("src", "no-cover.png");
      image.setAttribute("alt", "No cover found!");
    }
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
  for (let i = 0; i < 3; i++) {
    if (bookList[i].className !== e.target.className) {
      bookList[i].className = "book-card";
    } else {
      bookList[
        i
      ].className = `book-card book-card--active book-card__book${i} book-card--selected`;
    }
  }
  //After 1.5 seconds, the DOM elements get removed
  setTimeout(() => {
    for (let i = 0; i < bookList.length; i++) {
      if (bookList[i].className === "book-card") {
        bookList[i].remove();
        i--;
      }
    }
  }, 1000);
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
  setTimeout(
    () => (button.className = "form-submit form-submit--active"),
    1600
  );
  button.addEventListener("click", displayRecommendations);
}

//This grabs the books and puts them into the proper format for tastedive API
function makeRecommendArray() {
  let bookTitles = Array.from(document.querySelectorAll(".title"));
  searchStr = "";
  for (let i = 0; i < 3; i++) {
    if (i == 2) {
      searchStr += `book:${bookTitles[i].textContent}`;
    } else {
      searchStr += `book:${bookTitles[i].textContent},`;
    }
  }
  return searchStr;
}

async function displayRecommendations() {
  toggleLoading();
  let noBooks = true;
  let searchStr = makeRecommendArray();
  //Tastedive request
  let bookGetArray = await bookRecommend.getBookArray(searchStr);
  let inputParent = document.querySelector(`.book-output`);

  for (let i = 0; i < bookGetArray.length; i++) {
    //Google API request
    let bookResponse = await bookPredict.bookPredictGet(bookGetArray[i]);
    let bookInfo = bookResponse.data.items[i].volumeInfo;

    let title = document.createElement("p");
    title.className = `title rec-title-${i}`;
    title.innerHTML = `<b>${bookInfo.title}</b>`;
    let author = document.createElement("p");
    author.className = `author rec-author-${i}`;
    if (bookInfo.authors) {
      author.innerHTML = `<i>${bookInfo.authors[0]}</i>`;
    } else {
      author.innerHTML = "Unknown";
    }
    let image = document.createElement("img");

    if (bookInfo.imageLinks) {
      image.setAttribute("src", `${bookInfo.imageLinks.thumbnail}`);
    } else {
      image.setAttribute("src", "no-cover.png");
      image.setAttribute("alt", "No cover found!");
    }
    image.className = "cover";

    //Selects the ul element that the cards are going to be appended onto
    let bookCard = document.createElement("li");
    bookCard.className = "book-card--active book-card--output";

    //Appends all the created elements into the li element and fits that into the DOM
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(image);
    inputParent.appendChild(bookCard);
    noBooks = false;
  }
  if (noBooks) {
    let sorry = document.createElement("h1");
    sorry.innerHTML =
      "Sorry, I couldn't find any books! Try again with more mainstream books perhaps...";
    inputParent.appendChild(sorry);
  }
  console.log(inputParent);
  overlayHidden = false;
  overlay.className = "book-overlay book-overlay--active";
  toggleLoading();
}
//Toggles the overlay going up or down
let downButton = document.querySelector(".down-icon");
downButton.addEventListener("click", () => {
  if (overlayHidden) {
    downButton.setAttribute("src", "down.svg");
    overlay.className = "book-overlay book-overlay--active";
    overlayHidden = false;
  } else {
    overlay.className = "book-overlay book-overlay--hidden";
    downButton.setAttribute("src", "up.svg");
    overlayHidden = true;
  }
});

//Toggles the little loading animation on the cards
function toggleLoading() {
  let loadingCards = document.querySelectorAll(".book-input__card");
  button.removeEventListener("click", displayRecommendations);
  if (!loading) {
    let loadingClasses = [
      "book-input__book1 book-input__book1--loading",
      "book-input__book2 book-input__book2--loading",
      "book-input__book3 book-input__book3--loading",
    ];
    for (let i = 0; i < loadingCards.length; i++) {
      loadingCards[i].className = "book-input__card " + loadingClasses[i];
    }
    button.innerHTML = "Finding books...";
    loading = true;
  } else {
    let staticClasses = [
      "book-input__book1",
      "book-input__book2",
      "book-input__book3",
    ];
    for (let i = 0; i < loadingCards.length; i++) {
      loadingCards[i].className = "book-input__card " + staticClasses[i];
    }
    button.innerHTML = "Find me a book!";
    loading = false;
  }
}
