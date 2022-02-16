// create the book list
let books = [];

// books count
let bookCount = 0;

// the book class
const Book = {
  title: '',
  author: '',

  // to creat the title and the author
  setBook: function setbook(bookeTitle, bookeAuthor) {
    this.title = bookeTitle;
    this.author = bookeAuthor;
  },

  // to create and add the book
  creatAndAddBooks: function addbook(ul) {
    // create list li elemnts
    const li = document.createElement('li');
    li.className = `${this.title}${this.author}`;
    const pForTitle = document.createElement('p');
    const ulPWreaper = document.createElement('ul');
    ulPWreaper.className = 'ulWrapper';
    const pForAuthor = document.createElement('p');
    const pForDelete = document.createElement('button');
    pForDelete.className = 'delete';
    // add content to the elements
    pForTitle.textContent = this.title;
    pForAuthor.textContent = this.author;
    pForDelete.textContent = 'Remove';
    li.innerHTML = `"${this.title}" by ${this.author} <button class="delete">Remove</button>`;
    if (bookCount % 2 === 1) {
      li.id = 'bg-color';
    }
    ul.appendChild(li);
    return this;
  },

  deleteBook: function deletebook(e) {
    if (e.target.className === 'delete') {
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
let newBook = Book;
if (localStorage.books) {
  books = JSON.parse(localStorage.books);
}
// instance new_book
function clonebook(book) {
  const clone = {};
  Object.entries(book).forEach(([key, value]) => {
    clone[key] = value ;
});
  return clone;
}
// call nedded elements from the document
const bookList = document.querySelector('.book-list');
const form = document.getElementById('abbBookForm');
const title = document.getElementById('title');
const author = document.getElementById('author');

// create the books, add them the book list and local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  bookCount += 1;
  const newBook = Book;
  newBook.setBook(title.value, author.value);
  const newbook = newBook.creatAndAddBooks(bookList);
  books.push(clonebook(newbook));
  title.value = '';
  author.value = '';
  localStorage.books = JSON.stringify(books);
});
// create storaged books
for (let i = 0; i < books.length; i += 1) {
  bookCount += 1;
  newBook = Book;
  newBook.setBook(books[i].title, books[i].author);
  newBook.creatAndAddBooks(bookList);
}

// call delatebook method by using the remove button
bookList.addEventListener('click', (e) => {
  newBook = Book;
  newBook.deleteBook(e);
  localStorage.books = JSON.stringify(books);
});
