import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  constructor() {
    super();
    this.state = { query: "", country: "", progress: 0 };
  }
  apiKey = process.env.REACT_APP_API_KEY;
  changeCountry = (event) => {
    this.setState({
      query: this.state.query,
      country: event.target.dataset.country,
    });
    document.title = `
    Pigeon - 
    ${this.state.query ? 
      this.state.query.charAt(0).toUpperCase() + this.state.query.slice(1) : "General"} 
    News`;
  };
  searchQuery = (event) => {
    event.preventDefault();
    const searchBar = document.getElementById("search-bar");
    const query = searchBar.value;
    if(query.length === 0) return;
    searchBar.value = "";
    document.title = 
    `Pigeon - ${query.charAt(0).toUpperCase() + query.slice(1)}  News`;
    this.setState({ query: query, country: this.state.country });
  };
  clearQuery = (event) => {
    this.setState({ query: "", country: this.state.country });
    document.title = `Pigeon - ${event.target.textContent} News`;
  };
  setProgress = (progress) => {
    this.setState({ 
      query: this.state.query, 
      country: this.state.country, 
      progress: progress 
    });
  };
  render() {
    return (
      <>
        <Router>
          <Navbar searchQuery={ this.searchQuery } clearQuery={this.clearQuery} changeCountry={this.changeCountry} />
          <LoadingBar
            color='blue'
            shadow='false'
            height={3}
            progress={this.state.progress}
          />
          { this.state.query.length > 0 && this.state.country.length > 0 ? 
            <News setProgress={ this.setProgress } apiKey={this.apiKey} key={this.state.country + this.state.query} country={this.state.country} query={this.state.query} /> :
            this.state.query.length > 0 ?
            <News setProgress={ this.setProgress } apiKey={this.apiKey} key={this.state.query} query={this.state.query} /> :
            <Routes>
              <Route exact path="/" element={<News setProgress={ this.setProgress } apiKey={this.apiKey} key={`${this.state.country}general`} country={this.state.country} category="general" />} />
              <Route exact path="/sports" element={<News setProgress={ this.setProgress } apiKey={this.apiKey} key={`${this.state.country}sports`} country={this.state.country} category="sports" />} />
              <Route exact path="/technology" element={<News setProgress={ this.setProgress } apiKey={this.apiKey} key={`${this.state.country}technology`} country={this.state.country} category="technology" />} />
              <Route exact path="/science" element={<News setProgress={ this.setProgress } apiKey={this.apiKey} key={`${this.state.country}science`} country={this.state.country} category="science" />} />
              <Route exact path="/health" element={<News setProgress={ this.setProgress } apiKey={this.apiKey} key={`${this.state.country}health`} country={this.state.country} category="health" />} />
              <Route exact path="/entertainment" element={<News setProgress={ this.setProgress } apiKey={this.apiKey} key={`${this.state.country}entertainment`} country={this.state.country} category="entertainment" />} />
              <Route exact path="/business" element={<News setProgress={ this.setProgress } apiKey={this.apiKey} key={`${this.state.country}business`} country={this.state.country} category="business" />} />
            </Routes>
          }
        </Router>
      </>
    );
  }
}
