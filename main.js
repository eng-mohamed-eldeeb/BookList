const titleValue = document.getElementById("title");
const authorValue = document.getElementById("author");
const booksUL = document.querySelector(".book-list");
let bookArray = [];
const form = document.querySelector("#abbBookForm");

function show() {
  let bookId = 0;
  let Current = localStorage.getItem("books");
  Current = JSON.parse(Current);
  if (Current) {
    booksUL.innerHTML = "";
    Current.forEach((book) => {
      const li = document.createElement("li");
      const liP1 = document.createElement("li");
      const liP2 = document.createElement("li");
      li.className = `${bookId}`;
      const pForTitle = document.createElement("p");
      const pForAuthor = document.createElement("p");
      const ulPContaner = document.createElement("ul");
      ulPContaner.className = "ulWrapper";
      const pForDelete = document.createElement("button");
      pForDelete.className = "delete";
      pForTitle.textContent = book.title;
      pForAuthor.textContent = book.author;
      pForDelete.textContent = "Remove";
      liP2.appendChild(pForTitle);
      liP1.appendChild(pForAuthor);
      ulPContaner.innerHTML = `"${book.title}" by ${book.author}`;
      li.appendChild(ulPContaner);
      li.appendChild(pForDelete);
      booksUL.appendChild(li);
      if (bookId % 2 === 1) {
        li.id = "bg-color";
      }
      bookId += 1;
    });
  }
}

if (localStorage.getItem("books") != null) {
  show();
}
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addToLocalStorage() {
    const Current = localStorage.getItem("books");
    if (!Current) {
      bookArray.push(this);
      const newList = JSON.stringify(bookArray);
      localStorage.setItem("books", newList);
    } else {
      bookArray = JSON.parse(Current);
      bookArray.push(this);
      const newList = JSON.stringify(bookArray);
      localStorage.setItem("books", newList);
    }
  }

  deleteBook(i) {
    let currentBooks = localStorage.getItem("books");
    currentBooks = JSON.parse(currentBooks);
    currentBooks.splice(i, 1);
    currentBooks = JSON.stringify(currentBooks);
    localStorage.setItem("books", currentBooks);
    show();
  }
}
const newBook = new Book(titleValue.value, authorValue.value);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  newBook.addToLocalStorage();
  show();
  titleValue.value = "";
  authorValue.value = "";
});

booksUL.addEventListener("click", (e) => {
  newBook.deleteBook(e.target.parentNode.className);
});
