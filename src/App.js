import React from 'react';
import './App.css';
import Router from "./Router";
import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import { connect } from 'react-redux';
import {useMediaQuery} from 'react-responsive';
import Image from 'react-bootstrap/Image';
var logo = "/images/title/logo.png";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}


class App extends React.Component {	
  
  render(){
      return (
        <div>
            <Desktop>
                <BrowserRouter>
    	        <div className="App">
                  <header>
                    <Header/>
                  </header>
		        </div>
                    <Router/>
                </BrowserRouter>
            </Desktop>
            <Mobile>
                <div>
                    <Image style={{width: '100%'}} src={logo} fluid/>
                    <h1 style={{fontFamily: 'Segoe Print', padding: '10px'}}>Currently, small windows and mobile are not supported. The DnDOneStop app is pending App Store Approval.</h1>
                </div>
            </Mobile>
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
