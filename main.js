let titleValue = document.getElementById("title");
let authorValue = document.getElementById("author");
let booksUL = document.querySelector(".book-list");
let bookArray = [];
let form = document.querySelector("#abbBookForm");

function show() {
  var book_id = 0;
  let Current = localStorage.getItem("books");
    Current = JSON.parse(Current);
  if (Current) {
    booksUL.innerHTML = "";
    Current.forEach((book) => {
      const li = document.createElement("li");
      const liP1 = document.createElement("li");
      const liP2 = document.createElement("li");
      li.className = `${book_id}`;
      const pForTitle = document.createElement("p");
      const pForAuthor = document.createElement("p");
      const ulPContaner = document.createElement("ul");
      ulPContaner.className = 'ulWrapper';
      const pForDelete = document.createElement("button");
      pForDelete.className = "delete";
      // add content to the elements
      pForTitle.textContent = book.title;
      pForAuthor.textContent = book.author;
      pForDelete.textContent = "Remove";
      // add element to the list and the list to the ul
      liP2.appendChild(pForTitle);
      liP1.appendChild(pForAuthor);
      ulPContaner.innerHTML = `"${book.title}" by ${book.author}`;
      // ulPContaner.appendChild(liP1);
      // ulPContaner.appendChild(liP2);
      li.appendChild(ulPContaner);
      // li.appendChild(pForTitle);
      // li.appendChild(pForAuthor);
      li.appendChild(pForDelete);
      booksUL.appendChild(li);
      if (book_id % 2 === 1) {
        li.id = 'bg-color';
      }
      book_id++;
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
    let Current = localStorage.getItem("books");
    if (!Current) {
      bookArray.push(this);
      let newList = JSON.stringify(bookArray);
      localStorage.setItem("books", newList);
    } else {
      bookArray = JSON.parse(Current);
      bookArray.push(this);
      let newList = JSON.stringify(bookArray);
      localStorage.setItem("books", newList);
    }
  }
  showBook() {
    show();
  }

  deleteBookLi () {
    deleteBook();
  }

}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let new_book = new Book(titleValue.value, authorValue.value);
  new_book.addToLocalStorage();
  new_book.showBook();
  titleValue.value = '';
  authorValue.value = '';
});

function deleteBook(i) {
  let currentBooks = localStorage.getItem("books");
  currentBooks = JSON.parse(currentBooks);
  currentBooks.splice(i, 1);
  currentBooks = JSON.stringify(currentBooks);
  localStorage.setItem("books", currentBooks);
  show();
}

booksUL.addEventListener("click", (e) => {
  deleteBook(e.target.parentNode.className);
});
