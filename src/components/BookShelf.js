import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {

  constructor(props){
    super(props)
    this.changeShelf = this.changeShelf.bind(this)
  }
    changeShelf(id, old_shelf, new_shelf){   
      this.props.changeShelf(id, old_shelf, new_shelf)        
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
                        changeShelf = {this.changeShelf}
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