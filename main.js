// the book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
// to create and add the book
function creatAndAddBooks(book, ul) {
  // create list li elemnts
  const li = document.createElement('li');
  li.className = `${book.title}${book.author}`;
  const pForTitle = document.createElement('p');
  const pForAuthor = document.createElement('p');
  const pForDelete = document.createElement('button');
  const hr = document.createElement('hr');
  pForDelete.className = 'delete';
  // add content to the elements
  pForTitle.textContent = book.title;
  pForAuthor.textContent = book.author;
  pForDelete.textContent = 'Delete';
  // add element to the list and the list to the ul
  li.appendChild(pForTitle);
  li.appendChild(pForAuthor);
  li.appendChild(pForDelete);
  li.appendChild(hr);
  ul.appendChild(li);
}
// create the book list
const books = [];
// call nedded elements from the document
const bookList = document.querySelector('.book-list');
const form = document.getElementById('abbBookForm');
const title = document.getElementById('title');
const author = document.getElementById('author');
// create the books, add them the book list and local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBooke = new Book(title.value, author.value);
  books.push(newBooke);
  creatAndAddBooks(newBooke, bookList);
  localStorage.books = JSON.stringify(books);
});
// delete the book, remove them from the book list and local storage
function deleteBook (e){
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
}
// call delatebook function by using the remove button
bookList.addEventListener('click', (e) => {
  deleteBook(e);
  localStorage.books = JSON.stringify(books);
});