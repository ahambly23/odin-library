const myLibrary = [];

const Book = (title, author, year, pages, read) => {
    let newBook = {};
    newBook.title = title;
    newBook.author = author;
    newBook.year = year;
    newBook.pages = pages;
    newBook.read = read;
    return newBook;
}

const addBookToLibrary = obj => {
    myLibrary.push(obj);
}

let hobbit = Book("The Hobbit", "JRR Tolkien", 1972, 463, true)
addBookToLibrary(hobbit);

console.log(myLibrary)
console.log(hobbit)