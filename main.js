// create the book list
let books = [];
// the book class
const Book = {
  title: "",
  author: "",
  //to creat the title and the author
  setBook: function (bookeTitle, bookeAuthor) {
    this.title = bookeTitle;
    this.author = bookeAuthor;
  },
  // to create and add the book
  creatAndAddBooks: function (ul) {
    // create list li elemnts
    const li = document.createElement("li");
    li.className = `${this.title}${this.author}`;
    const pForTitle = document.createElement("p");
    const ulPWreaper = document.createElement("ul");
    ulPWreaper.className = `ulWrapper`;
    const pForAuthor = document.createElement("p");
    const pForDelete = document.createElement("button");
    const hr = document.createElement("hr");
    pForDelete.className = "delete";
    // add content to the elements
    pForTitle.textContent = this.title;
    pForAuthor.textContent = this.author;
    pForDelete.textContent = "Remove";
    li.innerHTML = `"${this.title}" by ${this.author} <button class="delete">Remove</button>`;
    ul.appendChild(li);
    ul.appendChild(hr);
    for (var i = 0; i < books.length; i += 1) {
      if (i % 2 === 0) {
        li.classList.add("bg-color");
      }
    }
    return this;
  },

  deleteBook: function (e) {
    if (e.target.className === "delete") {
      const li = e.target.parentElement;
      li.parentNode.removeChild(li);
      for (let i = 0; i < books.length; i += 1) {
        let ClassNAme = books[i].title;
        ClassNAme += books[i].author;
        if (e.target.parentElement.className === ClassNAme) {
          books.splice(i, 1);
        }
      }
    }
  },
};
if (localStorage.books) {
  books = JSON.parse(localStorage.books);
}
// call nedded elements from the document
const bookList = document.querySelector(".book-list");
const form = document.getElementById("abbBookForm");
const title = document.getElementById("title");
const author = document.getElementById("author");
  const new_book = Book;

// create the books, add them the book list and local storage
form.addEventListener("submit", (e) => {
  e.preventDefault();
  new_book.setBook(title.value, author.value);
  new_book.creatAndAddBooks(bookList);
  title.value = "";
  author.value = "";
  books.push(new_book);
  localStorage.books = JSON.stringify(books);
});

// create storaged books
// for (let i = 0; i <= books.length; i += 1) {
//   //Mohamed changes
//   const new_book = Book;
//   new_book.setBook(books[i].title, books[i].author);
//   // new_book.creatAndAddBooks(bookList);
//   // console.log(books[i].title, books[i].author);
//   // const newBooke = new Book(books[i].title, books[i].author);
//   // creatAndAddBooks(newBooke, bookList);
// }
// delete the book, remove them from the book list and local storage
function deleteBook(e) {
  if (e.target.className === "delete") {
    const li = e.target.parentElement;
    li.parentNode.removeChild(li);
    for (let i = 0; i < books.length; i += 1) {
      let ClassNAme = books[i].title;
      ClassNAme += books[i].author;
      if (e.target.parentElement.className === ClassNAme) {
        books.splice(i, 1);
      }
    }
  }
}
// call delatebook function by using the remove button
bookList.addEventListener("click", (e) => {
  new_book.deleteBook(e);
  localStorage.books = JSON.stringify(books);
});
