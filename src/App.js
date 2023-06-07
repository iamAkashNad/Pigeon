import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [progress, setProgress] = useState(0);

  const apiKey = process.env.REACT_APP_API_KEY;
  const changeCountry = (event) => {
    setQuery(query);
    setCountry(event.target.dataset.country);
    document.title = `
    Pigeon - 
    ${query ? 
      query.charAt(0).toUpperCase() + query.slice(1) : "General"}
    News`;
  };
  const searchQuery = (event) => {
    event.preventDefault();
    const searchBar = document.getElementById("search-bar");
    const query = searchBar.value;
    if(query.length === 0) return;
    searchBar.value = "";
    document.title = 
    `Pigeon - ${query.charAt(0).toUpperCase() + query.slice(1)}  News`;
    setQuery(query);
    setCountry(country);
  };
  const clearQuery = (event) => {
    setQuery("");
    setCountry(country);
    document.title = `Pigeon - ${event.target.textContent} News`;
  };
  return (
    <>
      <Router>
        <Navbar searchQuery={ searchQuery } clearQuery={clearQuery} changeCountry={changeCountry} />
        <LoadingBar
          color='blue'
          shadow='false'
          height={3}
          progress={progress}
        />
        { query.length > 0 && country.length > 0 ? 
          <News setProgress={ setProgress } apiKey={apiKey} key={country + query} country={country} query={query} /> :
          query.length > 0 ?
          <News setProgress={ setProgress } apiKey={apiKey} key={query} query={query} /> :
          <Routes>
            <Route exact path="/" element={<News setProgress={ setProgress } apiKey={apiKey} key={`${country}general`} country={country} category="general" />} />
            <Route exact path="/sports" element={<News setProgress={ setProgress } apiKey={apiKey} key={`${country}sports`} country={country} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={ setProgress } apiKey={apiKey} key={`${country}technology`} country={country} category="technology" />} />
            <Route exact path="/science" element={<News setProgress={ setProgress } apiKey={apiKey} key={`${country}science`} country={country} category="science" />} />
            <Route exact path="/health" element={<News setProgress={ setProgress } apiKey={apiKey} key={`${country}health`} country={country} category="health" />} />
            <Route exact path="/entertainment" element={<News setProgress={ setProgress } apiKey={apiKey} key={`${country}entertainment`} country={country} category="entertainment" />} />
            <Route exact path="/business" element={<News setProgress={ setProgress } apiKey={apiKey} key={`${country}business`} country={country} category="business" />} />
          </Routes>
        }
      </Router>
    </>
  );
}

export default App;
