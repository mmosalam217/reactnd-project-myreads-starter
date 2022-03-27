import React, { Component } from 'react'
import * as booksApi from '../BooksAPI'
import Book from './Book'
import {Link} from 'react-router-dom'

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: []
    }
    this.addToShelf = this.addToShelf.bind(this)
  }
  



    addToShelf(id, old_shelf, new_shelf){
      this.props.changeShelf(id, old_shelf, new_shelf)
    }

    onSearch(query){
        booksApi.search(query)
        .then(books => {
            if(books && books.length && books.length > 0){
              const readings = this.props.readings
              // If a book is in the users readings, get the shelf and add it to the book in the search page
              for (let i = 0; i < books.length; i++) {
                  for(let x=0; x < readings.length; x++){
                    if(books[i].id === readings[x].id){
                      books[i].shelf = readings[x].shelf
                    }
                  }                
              }
                this.setState({result: books})
            }else{
              this.setState({result: []})
            }

        })
        .catch(err => {
          this.setState({result: []})
          console.error(err)
        })
      
  
    }

    render(){
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link  to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" onChange={(e)=> this.onSearch(e.target.value)} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              { this.state && this.state.result.map(book => 
                 <li key={book.id}> 
                  <Book 
                        id={book.id}
                        shelf={book.shelf? book.shelf : 'none'}
                        changeShelf={this.addToShelf}
                        cover={book.imageLinks.thumbnail? book.imageLinks.thumbnail : 'https://i0.wp.com/code-artisan.io/wp-content/uploads/2020/12/default_book_cover_2015.jpg?resize=200%2C300&ssl=1'} 
                        title={book.title} 
                        authors={book.auhors && book.authors.length? book.authors.join(', ') : book.authors} 
                    /> 
                  </li>
                  )}
              </ol>
            </div>
          </div>
        )
    }
}

export default Search