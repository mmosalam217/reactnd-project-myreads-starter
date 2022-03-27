import React, { Component } from 'react'

class Book extends Component {

    changeShelf(id, old_shelf, new_shelf){
      this.props.changeShelf(id, old_shelf, new_shelf)
    }

    render(){
        return (
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.cover})` }}></div>
              <div className="book-shelf-changer">
                <select value ={this.props.shelf? this.props.shelf : 'none'} 
                onChange={ (e)=> this.changeShelf(this.props.id, this.props.shelf, e.target.value)}>
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