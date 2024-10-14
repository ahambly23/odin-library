const bookYear = document.getElementById("year");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");

const addButton = document.getElementById("add-new-book");
const formPopUp = document.getElementById("form-popup");
const closeButton = document.getElementById("close-popup");
const tableBody = document.querySelector("#book-table tbody");

const myLibrary = [];

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

    // Create each table data cell <td> and append it to the row
    newBookRow.innerHTML = `
        <td>${book.year}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read ? "Yes" : "No"}</td>
        <td><button class="remove-book" data-index="${index}">Remove</button></td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(newBookRow);

    // Attach an event listener to the "Remove" button
    const removeButton = newBookRow.querySelector(".remove-book");
    removeButton.addEventListener("click", () => {
        removeBook(index);
    });
};

const submitBookForm = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Create a new book object from user input
    const newBook = Book(bookTitle.value, bookAuthor.value, bookYear.value, bookPages.value, bookRead.checked);

    // Add the new book to the library array
    addBookToLibrary(newBook);

    // Display the new book in the table
    displayBook(newBook, myLibrary.length - 1);

    // Reset the form and close the pop-up
    document.querySelector(".form").reset();
    formPopUp.style.display = "none";
};

const removeBook = (index) => {
    // Remove the book from the myLibrary array
    myLibrary.splice(index, 1);

    // Clear the table
    tableBody.innerHTML = '';

    // Re-render the table with updated myLibrary array
    myLibrary.forEach(displayBook);
};

// Event listener to show the form when clicking "Add New Book" button
addButton.addEventListener("click", () => {
    formPopUp.style.display = "block";
});

// Event listener to hide the form when clicking the "Close" button
closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    formPopUp.style.display = "none";
});

// Event listener for form submission to add the book to the library
document.querySelector(".form").addEventListener("submit", submitBookForm);
