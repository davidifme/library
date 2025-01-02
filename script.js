const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    let book = new Book(title, author, pages);
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

function showBooks() {
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add('book');

        const bookTitle = document.createElement('h2');
        bookTitle.textContent = book.title;
        bookContainer.appendChild(bookTitle);

        const unorderedList = document.createElement('ul');
        
        const authorItem = document.createElement('li');
        authorItem.textContent = `Author: ${book.author}`;
        unorderedList.appendChild(authorItem);

        const pagesItem = document.createElement('li');
        pagesItem.textContent = `Pages: ${book.pages}`;
        unorderedList.appendChild(pagesItem);

        bookContainer.appendChild(unorderedList);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('book-buttons');

        const removeBookButton = document.createElement('button');
        removeBookButton.textContent = 'Remove';
        removeBookButton.addEventListener('click', () => {
            removeBookFromLibrary(index);
            bookList.removeChild(bookContainer);
        });

        const readStatusButton = document.createElement('button');
        readStatusButton.textContent = 'Read Status';
        readStatusButton.addEventListener('click', () => {

        });

        buttonsContainer.appendChild(removeBookButton);
        buttonsContainer.appendChild(readStatusButton);

        bookContainer.appendChild(buttonsContainer);
        bookList.appendChild(bookContainer);
    });
}

const bookList = document.querySelector('.book-list');
const showBooksButton = document.querySelector('.show-books');

const showDialogButton = document.querySelector('#show-dialog');
const dialog = document.querySelector('#create-new-book');
const closeDialogButton = document.querySelector('#close-button');
const dialogForm = document.getElementById('dialog-form')

// Dialog inputs
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const bookPagesInput = document.getElementById('book-pages');

showBooksButton.addEventListener('click', showBooks);

showDialogButton.addEventListener('click', () => {
    dialog.showModal();
});

closeDialogButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

dialogForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (dialogForm.checkValidity()) {
        addBookToLibrary(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value);
        showBooks();
        dialogForm.reset();
        dialog.close();
    }
});
