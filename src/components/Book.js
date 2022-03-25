import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

class Book extends Component {

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

    render(){
        return (
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.cover})` }}></div>
              <div className="book-shelf-changer">
                <select onChange={ (e)=> this.changeShelf(this.props.id, e.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors}</div>
          </div>
        )
    }
}


export default Book