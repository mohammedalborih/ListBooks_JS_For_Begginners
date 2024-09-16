// Book Class represents Book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class: UI task
class UI {
    static displyBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        var list = document.getElementById('book-list');
        var row = document.createElement('tr');
         row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
        
                    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div,form);

        setTimeout(() => { document.querySelector('.alert').remove()
            
        }, 2000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Stroe Class: Handels Storage

class Store {

    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        //console.log(JSON.stringify(books));
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}
// Event : Display Books
document.addEventListener('DOMContentLoaded',UI.displyBooks);
document.querySelector('#book-form').addEventListener('submit', (e) => 
    {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('من فضلك ادخل جميع الحقول','danger');
    }else{
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert('تم اضافة الكتاب بنجاح','success');
        UI.clearFields();
    }

});
//window.onload = UI.displyBooks;

// Event : Add a Book

// Event : Remove  a Book

document.querySelector('#book-list').addEventListener('click', (e) =>{
        UI.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        UI.showAlert('Book Removed','success');
});