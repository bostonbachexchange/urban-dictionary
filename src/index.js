import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DictionaryApp from './DictionaryApp';
import './index.css';

ReactDOM.render(
  <Router>
    <DictionaryApp />
  </Router>,
  document.getElementById('root')
);
