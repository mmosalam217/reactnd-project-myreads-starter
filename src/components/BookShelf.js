import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class BookShelf extends Component {

    changeBookShelf(id, category){   
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

    componentDidMount(){
        console.log(this.props)     

    }

    render(){
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {this.props.books
                  .filter(book  => book.shelf === this.props.shelf)
                  .map(book =>                   
                    <li key={book.id}> 
                        <Book shelf={book.shelf}
                        changeShelf = {this.changeBookShelf}
                        id={book.id} 
                        cover={book.imageLinks.thumbnail} 
                        title={book.title} 
                        authors={book.authors.join(', ')} />
                    </li> 
                    )
                  }
                </ol>
            </div>
            </div>
                
        )
    }
}

export default BookShelf