import React from 'react';
import './App.css';
import Router from "./Router";
import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import { connect } from 'react-redux';



class App extends React.Component {

    componentDidMount(){
        
	}
  
  render(){
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
}

const mapStateToProps = state => {
	return{
		user: state.user,
        userStatus: state.userStatus,
	}
}

export default connect(mapStateToProps, {
})(App);
