import React from 'react';
import './App.css';
import Visualizer from './Visualizer';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"></link>
      <div className="App">
        <BrowserRouter >
          <Visualizer></Visualizer>
        </BrowserRouter>
      </div >
    </>
  );
}

export default App;
