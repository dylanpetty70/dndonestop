import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "./components/Login";
import RedirectPage from "./components/404";
import CampaignDetails from './components/HighLevel/campaignDetails';
import CharacterInfo from './components/HighLevel/characterHigh';
import CreateEnv from './components/HighLevel/createEnv';
import GameInfo from './components/HighLevel/gameHigh';
import { handleGrab5e } from './actions/5eInfo';
import {handleUserStatus, handleGrabNames} from './actions/user';
import Chatbot from './components/Chatbot';
var firebase = require("firebase/app");
require('firebase/auth');


class Router extends Component {

	constructor(props){
		super(props);
        this.state = {status: false};
	}

	componentDidMount(){
        setTimeout(() => {if(!firebase.auth().currentUser){
            this.props.handleUserStatus(false);
        } else {
            if(!this.props.dndInfo.generalInfo){
                  this.props.handleGrab5e();
		    }
            if(this.props.userNames.length < 1){
                this.props.handleGrabNames();  
		    }
        }}, 2000)
	}


    render() {
      return (
        <div>
        {(this.props.userStatus) ? <>
            <Switch>
                <Route exact path="/"><GameInfo/></Route>
                <Route exact path="/createenv"><CreateEnv/></Route>
                <Route exact path="/characterInfo"><CharacterInfo/></Route>
                <Route exact path="/campaigndetails"><CampaignDetails/></Route>
                <Route exact path="/login" component={Login} /> 
                <Route path="*"> 
                    <RedirectPage/>
                </Route>
                </Switch>
                </>
                : 
                <> 
                <Switch>
                <Route exact path="/login" component={Login} /> 
                <Redirect from="*" to="/login" />
                </Switch>
                </>}
                
                {(this.props.dndInfo.generalInfo && this.props.userStatus) ? <Chatbot/> : <></>}
        </div>
      );
   }
}

const mapStateToProps = state => {
	return{
		dndInfo: state.dndInfo,
        userStatus: state.userStatus,
        userNames: state.userNames
	}
}

export default connect(mapStateToProps, {handleGrab5e, handleUserStatus, handleGrabNames})(Router);
