import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import BooksApp from './App'

ReactDOM.render(
<BrowserRouter>
  <BooksApp />
</BrowserRouter>
, document.getElementById('root'))
