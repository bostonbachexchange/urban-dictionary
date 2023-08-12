import React, { useState } from 'react';
import axios from 'axios';
import './DictionaryApp.css'; // Import your custom CSS for styling

function DictionaryApp() {
  const [inputText, setInputText] = useState('');
  const [definitions, setDefinitions] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const searchDefinitions = async () => {
    const lines = inputText.split('\n');
    const words = lines
      .join(' ') // Join lines into a single string
      .toLowerCase() // Convert to lowercase
      .match(/[a-z]+('[a-z]+)?/g); // Match words with contractions
    const uniqueWords = Array.from(new Set(words)); // Remove duplicate words
    const definitions = [];
  
    for (const word of uniqueWords) {
      try {
        const response = await axios.get(
          `https://api.urbandictionary.com/v0/define?term=${word}`
        );
        definitions.push({
          term: word,
          definitions: response.data.list
        });
      } catch (error) {
        console.error('Error fetching definitions:', error);
      }
    }
  
    setDefinitions(definitions);
  };
  
  

  return (
    <div className="app-container">
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
            <h2 className="word-term">{wordData.term}</h2>
            <ul className="definition-list">
        {wordData.definitions.map((definition, defIndex) => (
          <li key={defIndex}>
            {definition.definition.replace(/\[|\]/g, '')}
          </li>
        ))}
      </ul>
            </div>
        ))}
        </div>
    </div>
  );
}

export default DictionaryApp;
