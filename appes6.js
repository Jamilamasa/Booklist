class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // creat tr element
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
    list.appendChild(row);
  }
  alert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");

    container.insertBefore(div, form);

    // Timeout after 3seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2500);
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  removeBook(target) {
    if (target.className === "delete") {
      if (confirm("Are you sure you want to delete this book?")) {
        target.parentElement.parentElement.remove();
      }
    }
  }
}

class Store {
    static getBook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static displayBook() {
        const books = Store.getBook()
        const ui = new UI;

        books.forEach(function(book){
            ui.addBookToList(book);
        })
    }
    static storeBook(book) {
        const books = Store.getBook()
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBook()
        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}
// DOM Content loaded
document.addEventListener('DOMContentLoaded', Store.displayBook())
// Add event listener
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

        // Instantiate book object
        const book = new Book(title, author, isbn);
        // Instantiate UI object
        const ui = new UI();

        if (title === '' || author === '' || isbn === '') {
            // UI.alert
            ui.alert('Please Fill In All Fields', 'error')
        } else if (isNaN(isbn) === true) {
            ui.alert('Please Enter A Valid ISBN', 'error')
        } else {
            ui.alert('Book Added Successfully', 'success')
            ui.addBookToList(book);
            // Persist to local storage
            Store.storeBook(book)
            // Clear fields
            ui.clearFields();
        }

        
    e.preventDefault();
})

// Add event Listener to delete btn
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.removeBook(e.target);
    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.alert('Book Removed!!', 'success')
    e.preventDefault();
})