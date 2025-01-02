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

function createBookElement(book, index) {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add('book');

    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    bookContainer.appendChild(bookTitle);

    const unorderedList = document.createElement('ul');
    unorderedList.innerHTML = `
        <li>Author: ${book.author}</li>
        <li>Pages: ${book.pages}</li>
    `;
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
    // Możesz dodać logikę do przycisku Read Status

    buttonsContainer.appendChild(removeBookButton);
    buttonsContainer.appendChild(readStatusButton);

    bookContainer.appendChild(buttonsContainer);
    return bookContainer;
}

function showBooks() {
    bookList.innerHTML = '';
    
    myLibrary.forEach((book, index) => {
        const bookElement = createBookElement(book, index);
        bookList.appendChild(bookElement);
    });
}

const bookList = document.querySelector('.book-list');

const showDialogButton = document.querySelector('#show-dialog');
const dialog = document.querySelector('#create-new-book');
const closeDialogButton = document.querySelector('#close-button');
const dialogForm = document.getElementById('dialog-form')

// Dialog inputs
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const bookPagesInput = document.getElementById('book-pages');

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
