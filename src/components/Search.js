import React, { Component } from 'react'
import * as booksApi from '../BooksAPI'
import Book from './Book'
import {Link} from 'react-router-dom'

class Search extends Component {
    static state = {
        result: []
    }

    terms = [
      'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
    ]

    addToShelf(id, category){
      booksApi.update({id}, category)
      .then(updates =>{
        console.log(updates)
        booksApi.get(id)
        .then(book=>{
          console.log(book)
        })
        .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
    }

    onSearch(query){
      if(this.terms.includes(query)){
        booksApi.search(query)
        .then(books => {
            if(books && books.length && books.length > 0){
                this.setState({result: books})
                console.log(this.state.result)
            }else{
              this.setState({result: []})
            }

        })
        .catch(err => {
          this.setState({result: []})
          console.error(err)
        })
      }
  
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