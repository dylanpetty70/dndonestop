import React from 'react';
import './App.css';
import Router from "./Router";
import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';

	//gameinfo
		//design each componenent so it can be seen onscreen
	//create env	
		//rotatable pictures
		//move zIndex of pictures
		//new section for character tokens
		//more picture options
	//campaignDetails 
		//make notes sizable
		//make notes editable
		//make it more obvious that there are subnotes
		//have each notepad automatically make a note
		//notepads deletable
	
	//overall
		//create roles for "created" and "shared with" full functionality for everything except gameinfo
		//everything deletable by its owner
		//dashboard where you can tag information
		//chat feature that looks for gameinfo, characters, environments, and notes you've written, then links to the full info in new tab
		//audio for game ambiance https://freepd.com/music/Ancient%20Rite.mp3

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
