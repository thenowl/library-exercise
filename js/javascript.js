const myLibrary = [];
const newBookExpanderButton = document.querySelector("#newBookExpanderButton");
const addButton = document.querySelector("#addButton");

displayBooks(myLibrary);

newBookExpanderButton.addEventListener("click", () => {
  const addBookForm = document.querySelector("#addBookForm");
  const newBookExpanderSign = document.querySelector("#newBookExpanderSign");

  if (window.getComputedStyle(addBookForm).display === "none") {
    addBookForm.style.display = "flex";
    newBookExpanderSign.style.cssText = "transform: rotate(45deg);";
  } else {
    addBookForm.style.display = "none";
    newBookExpanderSign.style.cssText = "transform: rotate(0deg);";
  }
});

function Book(title, author, pages, read) {
  //Check if "new" is used when invoking the constructor
  if (!new.target) {
    throw Error("Must use the new operator to call the function");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read) {
    this.read = "Read";
  } else {
    this.read = "Not read";
  }
}

Book.prototype.toggleRead = function () {
  console.log(this.read);
  if (this.read === "Not read") {
    this.read = "Read";
  } else {
    this.read = "Not read";
  }
};

function addBookToLibrary(title, author, pages, read) {
  title = document.querySelector("#title").value;
  author = document.querySelector("#author").value;

  document.querySelector("#pages").value === ""
    ? (pages = "")
    : (pages = `${document.querySelector("#pages").value} pages`);

  document.querySelector("#readNo").checked ? (read = false) : (read = true);

  if (title === "" || author === "") {
    alert("You need to enter a title and an author");
    return;
  }

  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);

  displayBooks(myLibrary);
}

addButton.addEventListener("click", addBookToLibrary);

function displayBooks(books) {
  const myBooks = document.querySelector("#myBooks");

  books.map((book, index) => {
    const existingBooks = document.querySelector(".book-row");

    const bookRow = document.createElement("tr");
    bookRow.classList.add("book-row");

    // Establish library if no books in library are showing yet OR add new book:
    if (!existingBooks || index === books.length - 1) {
      for (let info in book) {
        // Exclude prototype from being displayed:
        if (book.hasOwnProperty(info)) {
          const infoElement = document.createElement("td");
          infoElement.textContent = book[info];
          bookRow.appendChild(infoElement);

          // Create autocomplete text input for author from entry:
          if (info === "author") {
            const authorSuggestion =
              document.querySelector("#authorSuggestion");
            const authorAutoCompleteID = book[info]
              .toLowerCase()
              .replaceAll(".", "")
              .split(" ")
              .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

            // Check if author already exists:
            if (!document.querySelector(`#${authorAutoCompleteID}`)) {
              const authorAutoComplete = document.createElement("option");
              authorAutoComplete.textContent = book[info];

              authorAutoComplete.setAttribute("id", `${authorAutoCompleteID}`);
              authorSuggestion.appendChild(authorAutoComplete);
            }
          }

          // Toggle read status:
          if (info === "read") {
            const toggleReadStatus = document.createElement("button");
            toggleReadStatus.classList.add("read-status-button");
            toggleReadStatus.textContent = "Change status?";
            infoElement.appendChild(toggleReadStatus);
            toggleReadStatus.addEventListener("click", book.toggleRead);
          }
        }
      }
    } else {
      // If shown library is not empty and index does not equal newest book entry;
      return;
    }

    const removeButtonCell = document.createElement("td");
    const removeBook = document.createElement("button");
    removeBook.classList.add("remove-book");
    removeBook.textContent = "Remove book";
    removeButtonCell.appendChild(removeBook);
    bookRow.appendChild(removeButtonCell);

    myBooks.appendChild(bookRow);

    // Remove book:
    removeBook.addEventListener("click", () => {
      myBooks.removeChild(bookRow);
      books.splice(index, 1);
    });
  });
}
