const libraryContainer = document.getElementById('library-container');
const addForm = document.getElementById('add-form');
const addBtn = document.getElementById('add-btn');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const readCheck = document.getElementById('read-check');

let library = [];
let removeBtns;

function Book(title, author, isRead, index) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.index = index;
}

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary();
});

function addBookToLibrary() {
    newBook = new Book(inputTitle.value, inputAuthor.value, readCheck.checked == true, library.length);
    library.push(newBook);
    printLibrary();
}

function printLibrary() {
    libraryContainer.innerHTML = '';

    for (let i = 0; i < library.length; i++) {
        let book = document.createElement('div');
        book.classList.add('book');

        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        let title = document.createElement('h2');
        title.classList.add('book-text');
        title.textContent = library[i].title;

        let author = document.createElement('h2');
        author.classList.add('book-text');
        author.textContent = library[i].author;

        let bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        let isRead = document.createElement('h2');
        isRead.classList.add('book-read-text');
        if (library[i].isRead) {
            isRead.textContent = "Read";
        } else {
            isRead.textContent = "Not Read";
        }
 
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('data-index', i);
        deleteBtn.textContent = "Delete";

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookInfo.appendChild(isRead);
        bookInfo.appendChild(deleteBtn);
        book.appendChild(bookCard);
        book.appendChild(bookInfo);
        libraryContainer.appendChild(book);
    }

    removeBtns = document.querySelectorAll('.delete-btn');
    removeBtns.forEach(element => element.addEventListener('click', () => {
        let index = element.getAttribute('data-index');
        let targetBook = element.parentNode.parentNode;
        targetBook.innerHTML = '';
        targetBook.remove();
        resetLibrary(index);
    }))
    
}

function resetLibrary(index) {
    library.splice(index, 1);
    printLibrary();
}