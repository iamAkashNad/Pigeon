// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  name = "Akash Nad";
  render() {
    return (
      <div>Hello I'm { this.name } & this is my first class-based component.</div>
    );
  }
}
