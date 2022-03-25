import React from 'react'
import  { Link, Route, Routes } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: {
      wantToRead: [],
      currentlyReading: [],
      read: []
    },
    shelfs: ["wantToRead", "currentlyReading", "read"]
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then(books => {
      this.setState({
        books: {
          wantToRead: books.filter(book => book.shelf === 'wantToRead'),
          currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
          read: books.filter(book => book.shelf === 'read')
        }

      })
      console.log(books)
    })
    .catch(err => console.error(err))
  }



  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/search' element={<Search />} />
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
                    books={this.state.books[shelf]}
                    />
                  )}
              
                </div>
              </div>
                <Link to='/search' className="open-search">Add a book</Link>
            </div>
          } />
        </Routes>



      </div>
    )
  }

  changeShelf(id, category){
    if(category !== ''){
        BooksAPI.update({id}, category)
        .then(updates =>{
          console.log(updates)
          BooksAPI.get(id)
          .then(book=>{
            console.log(book)
          })
          .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    }
}
}

export default BooksApp
