class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = false;
    }

    isRead() {
        return this.readStatus ? 'read' : 'unread';
    }
}

class Library {
    constructor() {
        this.books = [];
        this.bookList = document.querySelector('.book-list');

        // Dialog elements
        this.showDialogButton = document.querySelector('#show-dialog');
        this.dialog = document.querySelector('#create-new-book');
        this.closeDialogButton = document.querySelector('#close-button');
        this.dialogForm = document.getElementById('dialog-form');
        this.bookTitleInput = document.getElementById('book-title');
        this.bookAuthorInput = document.getElementById('book-author');
        this.bookPagesInput = document.getElementById('book-pages');

        // Event listeners
        this.showDialogButton.addEventListener('click', () => this.dialog.showModal());
        this.closeDialogButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.dialog.close();
        });
        this.dialogForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    addBook(title, author, pages) {
        const book = new Book(title, author, pages);
        this.books.push(book);
        this.showBooks();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.showBooks();
    }

    showBooks() {
        this.bookList.innerHTML = '';
        this.books.forEach((book, index) => {
            const bookElement = this.#createBookElement(book, index);
            this.bookList.appendChild(bookElement);
        });
    }

    #createBookElement(book, index) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add('book');

        const bookTitle = document.createElement('h2');
        bookTitle.textContent = book.title;
        bookContainer.appendChild(bookTitle);

        const unorderedList = document.createElement('ul');
        unorderedList.innerHTML = `
            <li>Author: ${book.author}</li>
            <li>Pages: ${book.pages}</li>
            <li>Read Status: ${book.isRead()}</li>
        `;
        bookContainer.appendChild(unorderedList);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('book-buttons');

        const removeBookButton = document.createElement('button');
        removeBookButton.textContent = 'Remove';
        removeBookButton.addEventListener('click', () => {
            this.removeBook(index);
        });

        const readStatusButton = document.createElement('button');
        readStatusButton.textContent = 'Read Status';
        readStatusButton.addEventListener('click', () => {
            book.readStatus = !book.readStatus;
            unorderedList.children[2].textContent = `Read Status: ${book.isRead()}`;
        });

        buttonsContainer.appendChild(removeBookButton);
        buttonsContainer.appendChild(readStatusButton);

        bookContainer.appendChild(buttonsContainer);
        return bookContainer;
    }

    handleFormSubmit(event) {
        event.preventDefault();

        if (!this.dialogForm.checkValidity()) {
            if (this.bookTitleInput.validity.tooShort) {
                this.bookTitleInput.setCustomValidity('Book title has to be minimum 3 characters long.');
            } else {
                this.bookTitleInput.setCustomValidity('');
            }

            if (this.bookAuthorInput.validity.tooShort) {
                this.bookAuthorInput.setCustomValidity('Author name has to be minimum 3 characters long.');
            } else {
                this.bookAuthorInput.setCustomValidity('');
            }

            if (this.bookPagesInput.validity.rangeUnderflow) {
                this.bookPagesInput.setCustomValidity('Minimum pages number is 1.');
            } else {
                this.bookPagesInput.setCustomValidity('');
            }

            this.dialogForm.reportValidity();
        } else {
            const title = this.bookTitleInput.value;
            const author = this.bookAuthorInput.value;
            const pages = this.bookPagesInput.value;
            this.addBook(title, author, pages);
            this.dialogForm.reset();
            this.dialog.close();
        }
    }
}

// Inicjalizacja biblioteki
const myLibrary = new Library();