const bookYear = document.getElementById("year");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");

const addButton = document.getElementById("add-new-book");
const formPopUp = document.getElementById("form-popup");
const closeButton = document.getElementById("close-popup");
const tableBody = document.querySelector("#book-table tbody");

const myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        pages: 300,
        read: true
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        year: 1951,
        pages: 277,
        read: false
    }
];

const Book = (title, author, year, pages, read) => {
    return {
        title,
        author,
        year,
        pages,
        read
    };
};

const addBookToLibrary = (book) => {
    myLibrary.push(book);
};

const displayBook = (book, index) => {
    const newBookRow = document.createElement("tr");

    newBookRow.innerHTML = `
        <td>${book.year}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><button class="read-status">${book.read ? "Yes" : "No"}</button></td>
        <td><button class="remove-book" data-index="${index}">Remove</button></td>
    `;

    tableBody.appendChild(newBookRow);

    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, idx) => {
        if (idx % 2 === 1) {
            row.style.backgroundColor = '#ddc9b4';
        } else {
            row.style.backgroundColor = '#bcac9b';
        }
    });

    const removeButton = newBookRow.querySelector(".remove-book");
    removeButton.addEventListener("click", () => {
        removeBook(index);
    });

    const readStatusButton = newBookRow.querySelector(".read-status");
    readStatusButton.addEventListener("click", () => {
        toggleReadStatus(index);
    });
};

const toggleReadStatus = (index) => {
    myLibrary[index].read = !myLibrary[index].read;

    tableBody.innerHTML = '';
    myLibrary.forEach(displayBook);
};

const submitBookForm = (event) => {
    event.preventDefault();
    const newBook = Book(bookTitle.value, bookAuthor.value, bookYear.value, bookPages.value, bookRead.checked);
    addBookToLibrary(newBook);
    displayBook(newBook, myLibrary.length - 1);

    document.querySelector(".form").reset();
    formPopUp.classList.remove("active");
};

const removeBook = (index) => {
    myLibrary.splice(index, 1);
    tableBody.innerHTML = '';
    myLibrary.forEach(displayBook);
};

addButton.addEventListener("click", () => {
    formPopUp.classList.add("active");
});

closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    formPopUp.classList.remove("active"); 
});

document.querySelector(".form").addEventListener("submit", submitBookForm);

document.addEventListener("DOMContentLoaded", () => {
    myLibrary.forEach(displayBook);
});
