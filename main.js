const titleValue = document.getElementById('title');
const authorValue = document.getElementById('author');
const booksUL = document.querySelector('.book-list');
let bookArray = [];
const form = document.querySelector('#abbBookForm');

function show() {
  let bookId = 0;
  let Current = localStorage.getItem('books');
  Current = JSON.parse(Current);
  if (Current) {
    booksUL.innerHTML = '';
    Current.forEach((book) => {
      const li = document.createElement('li');
      const liP1 = document.createElement('li');
      const liP2 = document.createElement('li');
      li.className = `${bookId}`;
      const pForTitle = document.createElement('p');
      const pForAuthor = document.createElement('p');
      const ulPContaner = document.createElement('ul');
      ulPContaner.className = 'ulWrapper';
      const pForDelete = document.createElement('button');
      pForDelete.className = 'delete';
      // add content to the elements
      pForTitle.textContent = book.title;
      pForAuthor.textContent = book.author;
      pForDelete.textContent = 'Remove';
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
      if (bookId % 2 === 1) {
        li.id = 'bg-color';
      }
      bookId += 1;
    });
  }
}

function deleteBook(i) {
  let currentBooks = localStorage.getItem('books');
  currentBooks = JSON.parse(currentBooks);
  currentBooks.splice(i, 1);
  currentBooks = JSON.stringify(currentBooks);
  localStorage.setItem('books', currentBooks);
  show();
}

if (localStorage.getItem('books') != null) {
  show();
}
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addToLocalStorage() {
    const Current = localStorage.getItem('books');
    if (!Current) {
      bookArray.push(this);
      const newList = JSON.stringify(bookArray);
      localStorage.setItem('books', newList);
    } else {
      bookArray = JSON.parse(Current);
      bookArray.push(this);
      const newList = JSON.stringify(bookArray);
      localStorage.setItem('books', newList);
    }
  }

  showBook(x) {
    this.x = x;
    show();
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBook = new Book(titleValue.value, authorValue.value);
  newBook.addToLocalStorage();
  const x = 0;
  newBook.showBook(x);
  titleValue.value = '';
  authorValue.value = '';
});

booksUL.addEventListener('click', (e) => {
  deleteBook(e.target.parentNode.className);
});
