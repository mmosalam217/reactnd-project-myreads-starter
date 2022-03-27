import React from 'react'
import  { Link, Routes, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import Search from './components/Search'

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      shelfs: ["wantToRead", "currentlyReading", "read"]
    }

    this.changeShelf = this.changeShelf.bind(this)
  }


  componentDidMount(){
    BooksAPI.getAll()
    .then(books => {
      this.setState({
        books: books
      })
    })
    .catch(err => console.error(err))
  }



  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/search'  element={<Search readings={this.state.books} changeShelf={this.changeShelf} />} />
          <Route exact path='/' element={
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { 
            this.state.shelfs.map(shelf=>
              <BookShelf key={shelf}
              shelf={shelf}
              books={this.state.books.filter(book => book.shelf === shelf)}
              changeShelf={this.changeShelf}
              />
            )}
        
          </div>
        </div>
          <Link to= '/search' className="open-search">Add a book</Link>
        </div>
          } />
        </Routes>
  
      </div>
    )
  }

  changeShelf(id, old_shelf, new_shelf){
        BooksAPI.update({id}, new_shelf)
        .then(updates =>{
          BooksAPI.get(id)
          .then(book=>{
            this.addOrMoveBookBetweenShelfs(book, this.state.books, old_shelf)
          })
          .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    
}

// Adds a book to the target shelf if its not inlcuded yet in the users readings (from search component)
// Or moves the book from one shelf to another
  addOrMoveBookBetweenShelfs(book, books, old_shelf){
    if(old_shelf !== 'none'){
       for(let i =0; i < books.length; i++){
          if(books[i].id === book.id){
            books.splice(i, 1, book)
            break
          }
       }
       this.setState({
        books
      })

    }else{
      books.push(book)
      this.setState({
        books
      })
    }
  }
}

export default BooksApp
