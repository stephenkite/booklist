// Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI(){}

// Add prototype
UI.prototype.addBookToList = function(book){
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

// Delete book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove()
  }
}

// Show alert
UI.prototype.showAlert = function(message, className){
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

//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

// Add event listeners
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
  // Show message
  ui.showAlert('Succesfully removed', 'success')

  e.preventDefault()
})