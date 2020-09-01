import React from 'react';
import './App.css';
import Router from "./Router";
import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';


function App() {
  return (
    <div>
        <BrowserRouter>
    	<div className="App">
          <header>
            <Header/>
          </header>
		</div>
                <Router/>
            </BrowserRouter>
    </div>
  );
}

export default App;
