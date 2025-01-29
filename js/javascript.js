const library = (function () {
  const myLibrary = [];

  const getLibrary = () => myLibrary;

  class Book {
    constructor(title, author, pages, status) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
    }

    toggleStatus() {
      if (this.status === 'Not read') {
        this.status = 'Read';
      } else {
        this.status = 'Not read';
      }
    }
  }

  function addBookToLibrary(title, author, pages, status) {
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const pagesInput = document.querySelector('#pages');
    const titleError = document.querySelector('#titleError');
    const authorError = document.querySelector('#authorError');
    const pagesError = document.querySelector('#pagesError');

    titleError.classList.remove('active');
    titleError.textContent = '';
    authorError.classList.remove('active');
    authorError.textContent = '';
    pagesError.classList.remove('active');
    pagesError.textContent = '';

    if (titleInput.validity.valueMissing) {
      titleError.textContent = 'Please enter a title.';
      titleError.classList.add('active');
      return;
    } else if (authorInput.validity.valueMissing) {
      authorError.textContent = 'Please enter an author.';
      authorError.classList.add('active');
      return;
    } else if (pagesInput.validity.valueMissing) {
      pagesError.textContent = 'Please specify the number of pages.';
      pagesError.classList.add('active');
      return;
    }

    title = titleInput.value;
    author = authorInput.value;

    pagesInput.value === ''
      ? (pages = '')
      : (pages = `${pagesInput.value} pages`);

    document.querySelector('#readNo').checked
      ? (status = 'Not read')
      : (status = 'Read');

    const newBook = new Book(title, author, pages, status);

    myLibrary.push(newBook);

    displayHandler.displayBooks(myLibrary);
  }

  return { getLibrary, addBookToLibrary };
})();

const displayHandler = (function () {
  const newBookExpanderButton = document.querySelector(
    '#newBookExpanderButton'
  );

  newBookExpanderButton.addEventListener('click', () => {
    const addBookForm = document.querySelector('#addBookForm');
    const newBookExpanderSign = document.querySelector('#newBookExpanderSign');

    if (window.getComputedStyle(addBookForm).display === 'none') {
      addBookForm.style.display = 'flex';
      newBookExpanderSign.style.cssText = 'transform: rotate(45deg);';
    } else {
      addBookForm.style.display = 'none';
      newBookExpanderSign.style.cssText = 'transform: rotate(0deg);';
    }
  });

  const addButton = document.querySelector('#addButton');
  addButton.addEventListener('click', library.addBookToLibrary);

  function displayBooks(books) {
    const myBooks = document.querySelector('#myBooks');

    books.map((book, index) => {
      const bookRow = document.createElement('tr');
      bookRow.classList.add('book-row');

      // Skip if index does not equal newest book:
      if (index < books.length - 1) {
        return;
      } else {
        // Distribute book info across table-data cells:
        for (let info in book) {
          const infoElement = document.createElement('td');
          infoElement.textContent = book[info];
          infoElement.setAttribute(
            'data-th',
            `${info.charAt(0).toUpperCase() + info.slice(1)}`
          );
          bookRow.appendChild(infoElement);

          // Create autocomplete text input for author from entry:
          if (info === 'author') {
            const authorSuggestion =
              document.querySelector('#authorSuggestion');
            const authorAutoCompleteID = book[info]
              .toLowerCase()
              .replaceAll('.', '')
              .split(' ')
              .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

            // Check if author already exists:
            if (!document.querySelector(`#${authorAutoCompleteID}`)) {
              const authorAutoComplete = document.createElement('option');
              authorAutoComplete.textContent = book[info];

              authorAutoComplete.setAttribute('id', `${authorAutoCompleteID}`);
              authorSuggestion.appendChild(authorAutoComplete);
            }
          }

          // Toggle read status:
          if (info === 'status') {
            const toggleReadStatus = document.createElement('button');
            toggleReadStatus.classList.add('read-status-button');
            toggleReadStatus.classList.add('status-button');
            toggleReadStatus.textContent = 'Change status?';
            infoElement.appendChild(toggleReadStatus);
            infoElement.classList.add('read-status');
            toggleReadStatus.addEventListener('click', () => {
              book.toggleStatus();
              infoElement.textContent = book[info];
              infoElement.appendChild(toggleReadStatus);
            });
          }
        }
      }

      const removeButtonCell = document.createElement('td');
      const removeBook = document.createElement('button');
      removeBook.classList.add('remove-book');
      removeBook.textContent = 'Remove book';
      removeButtonCell.appendChild(removeBook);
      bookRow.appendChild(removeButtonCell);

      myBooks.appendChild(bookRow);

      // Remove book:
      removeBook.addEventListener('click', () => {
        myBooks.removeChild(bookRow);
        books.splice(index, 1);
      });
    });
  }
  displayBooks(library.getLibrary());

  return { displayBooks };
})();
