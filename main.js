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
      pForTitle.textContent = book.title;
      pForAuthor.textContent = book.author;
      pForDelete.textContent = 'Remove';
      liP2.appendChild(pForTitle);
      liP1.appendChild(pForAuthor);
      ulPContaner.innerHTML = `"${book.title}" by ${book.author}`;
      li.appendChild(ulPContaner);
      li.appendChild(pForDelete);
      booksUL.appendChild(li);
      if (bookId % 2 === 1) {
        li.id = 'bg-color';
      }
      bookId += 1;
    });
  }
}

if (localStorage.getItem('books') != null) {
  show();
}
class Book {
  constructor() {
    return this;
  }

  creation(title, author) {
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

  deleteBook(i) {
    this.i = i;
    let currentBooks = localStorage.getItem('books');
    currentBooks = JSON.parse(currentBooks);
    currentBooks.splice(this.i, 1);
    currentBooks = JSON.stringify(currentBooks);
    localStorage.setItem('books', currentBooks);
    show();
  }
}
const newBook = new Book();
form.addEventListener('submit', (e) => {
  newBook.creation(titleValue.value, authorValue.value);
  e.preventDefault();
  newBook.addToLocalStorage();
  show();
  titleValue.value = '';
  authorValue.value = '';
});

booksUL.addEventListener('click', (e) => {
  e.target.className === 'delete' ? newBook.deleteBook(e.target.parentNode.className) : show();
});

const list = document.querySelector('.asesomeBooks');
const addForm = document.querySelector('.addForm');
const contactInfo = document.querySelector('.contact');
const spans = document.querySelectorAll('span');

spans.forEach((e) => {
  e.addEventListener('click', (e) => {
    if (e.target.classList.contains('spanLiL')) {
      if (list.classList.contains('d-flex')) {
        return;
      }
      list.classList.toggle('d-flex');
      list.classList.toggle('d-none');
      addForm.classList.remove('d-flex');
      addForm.classList.add('d-none');
      contactInfo.classList.remove('d-flex');
      contactInfo.classList.add('d-none');
    }
    if (e.target.classList.contains('spanLiA')) {
      if (addForm.classList.contains('d-flex')) {
        return;
      }
      addForm.classList.toggle('d-flex');
      addForm.classList.toggle('d-none');
      list.classList.remove('d-flex');
      list.classList.add('d-none');
      contactInfo.classList.remove('d-flex');
      contactInfo.classList.add('d-none');
    }
    if (e.target.classList.contains('spanLiC')) {
      if (contactInfo.classList.contains('d-flex')) {
        return;
      }
      contactInfo.classList.toggle('d-flex');
      contactInfo.classList.toggle('d-none');
      list.classList.remove('d-flex');
      list.classList.add('d-none');
      addForm.classList.remove('d-flex');
      addForm.classList.add('d-none');
    }
  });
});
