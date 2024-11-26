const myLibrary = [];

displayBooks(myLibrary);

function Book(title, author, pages, read, bookInfo) {
  //Check if "new" is used when invoking the constructor
  if (!new.target) {
    throw Error("Must use the new operator to call the function");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  title = document.querySelector("#title").value;
  author = document.querySelector("#author").value;
  pages = document.querySelector("#pages").value;
  read = document.querySelector("#read").value;

  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
  displayBooks(myLibrary);
}

const addButton = document.querySelector("#addButton");

addButton.addEventListener("click", addBookToLibrary);

function displayBooks(books) {
  const myBooks = document.querySelector("#myBooks");

  myBooks.removeChild;
  books.map((book) => {
    const bookRow = document.createElement("tr");
    bookRow.classList.add("book-row");

    for (let info in book) {
      const infoElement = document.createElement("td");
      infoElement.textContent = book[info];
      bookRow.appendChild(infoElement);
    }

    myBooks.appendChild(bookRow);
  });
}
