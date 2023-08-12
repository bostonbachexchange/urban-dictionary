import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import WordDefinitions from './WordDefinitions';
import './DictionaryApp.css';

function DictionaryApp() {
  const [inputText, setInputText] = useState('');
  const [definitions, setDefinitions] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const searchDefinitions = async () => {
    const lines = inputText.split('\n');
    const wordsByLine = lines.map((line) =>
      line.toLowerCase().match(/[a-z]+('[a-z]+)?/g)
    );
    const words = wordsByLine
      .flat() // Flatten the array of arrays
      .filter((word) => word !== null); // Remove null values from the array
    const uniqueWords = Array.from(new Set(words)); // Remove duplicate words
    const definitions = [];

    for (const word of uniqueWords) {
      try {
        const response = await axios.get(
          `https://api.urbandictionary.com/v0/define?term=${word}`
        );
        definitions.push({
          term: word,
          definitions: response.data.list,
        });
      } catch (error) {
        console.error('Error fetching definitions:', error);
      }
    }

    setDefinitions(definitions);
  };

  return (
    <div className="app-container">
      <Router>
        <h1 className="app-title">Urban Dictionary Search</h1>
        <textarea
          className="input-textarea"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Paste song lyrics here..."
          rows={10}
          cols={50}
        />
        <button className="search-button" onClick={searchDefinitions}>
          Search
        </button>
        <div className="definitions-container">
          {definitions.map((wordData, index) => (
            <div className="word-definition" key={index}>
              <h2 className="word-term">
                <Link to={`/word/${wordData.term}`}>{wordData.term}</Link>
              </h2>
            </div>
          ))}
        </div>
        <Routes>
          <Route path="/word/:word" element={<WordDefinitions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default DictionaryApp;
