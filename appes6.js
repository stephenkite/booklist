class Book{
  constructor(title, author, isbn){
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UI{
  addBookToList(book){
    const list = document.getElementById('book-list')
    // create a tr element
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href = "#" class = 'delete'>x</a></td>
    `

    list.appendChild(row)
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove()
    }
  }

  showAlert(message, className){
    // Create a div element
    const div = document.createElement('div')
    // Add classes
    div.className = `alert ${className}`
    // Add text
    div.appendChild(document.createTextNode(message))
    // Get parent
    const container = document.querySelector('.container')
    // Get form
    const form = document.querySelector('#book-form')
    // Insert alert
    container.insertBefore(div, form)
    // Timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove()
    }, 3000)
  }

  clearFields(){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }
}

// Local storage class
class Store{
  static getBooks(){
    let books
    if(localStorage.getItem('books') === null){
      books = []
    }else{
      books = JSON.parse(localStorage.getItem('books'))
    }
    
    return books
  }

  static displayBooks(){
    const books = Store.getBooks()
    
    books.forEach((book) => {
      const ui = new UI
      ui.addBookToList(book)
    })
  }

  static addBook(book){
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn){
    const books = Store.getBooks()
    books.forEach((book, index) => {
      if(book.isbn === isbn){
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks)

// Submit event listener
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Instantiate a book
  const book = new Book(title, author, isbn)

  //Instantiate UI
  const ui = new UI()

  // Validate
  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Please fill in all fields','error')
  }else{
    // Add book to list
    ui.addBookToList(book)

    // Add to LS
    Store.addBook(book)
    
    // Show success
    ui.showAlert('Book added succesfully', 'success ')
    // Clear input fields
    ui.clearFields()
  }

  e.preventDefault()
})

// Event listener for delete
document.querySelector('#book-list').addEventListener('click',function(e){
  // Instantiate UI
  const ui = new UI
  // Delete
  ui.deleteBook(e.target)
  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  // Show message
  ui.showAlert('Succesfully removed', 'success')

  e.preventDefault()
})