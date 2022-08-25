// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI() {}

// UI prototype (add book)
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // creat tr element
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
}
// UI prtotype (alert)
UI.prototype.alert = function (message, className) {
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container')
    const form = document.getElementById('book-form')

    container.insertBefore(div, form);

    // Timeout after 3seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2500)
};
// UI prototype (clear field)
UI.prototype.clearFields = function () {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}
// UI prototype (remove book)
UI.prototype.removeBook= function(target) {
    
    if (target.className === "delete") {
        if (confirm('Are you sure you want to delete this book?')) {
            target.parentElement.parentElement.remove();
        }
    }
}
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
            // Clear fields
            ui.clearFields();
        }

        
    e.preventDefault();
})

// Add event Listener to delete btn
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.removeBook(e.target);
    ui.alert('Book Removed!!', 'success')
    e.preventDefault();
})