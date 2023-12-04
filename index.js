const libraryContainer = document.getElementById('library-container');
const addForm = document.getElementById('add-form');
const addBtn = document.getElementById('add-btn');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const readCheck = document.getElementById('read-check');

let library = [];
let removeBtns;
let changeReadBtns;

function Book(title, author, isRead, index) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.index = index;
}

addBtn.addEventListener('click', (event) => {
    let isValid = addForm.checkValidity();
    if(isValid) {
        event.preventDefault();
        addBookToLibrary();
        addForm.reset();
    }
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

        let isReadBtn = document.createElement('button');
        isReadBtn.classList.add('book-read-btn');
        isReadBtn.setAttribute('data-index', i);
        if (library[i].isRead) {
            isReadBtn.textContent = "Read";
            isReadBtn.style.background = "yellowgreen";
        } else {
            isReadBtn.textContent = "Not Read";
            isReadBtn.style.background = "orangered";
        }
 
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('data-index', i);
        deleteBtn.textContent = "Delete";

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookInfo.appendChild(isReadBtn);
        bookInfo.appendChild(deleteBtn);
        book.appendChild(bookCard);
        book.appendChild(bookInfo);
        libraryContainer.appendChild(book);
    }

    changeReadBtns = document.querySelectorAll('.book-read-btn');
    changeReadBtns.forEach(element => element.addEventListener('click', () => {
        let index = element.getAttribute('data-index');
        let status = element.textContent === "Read" ? true : false;
        if (status) {
            element.textContent = "Not Read";
            changeBookStatus(index, false)
        } else {
            element.textContent = "Read";
            changeBookStatus(index, true);
        }
    }))

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

function changeBookStatus(index, status) {
    library[index].isRead = status;
    printLibrary();
}