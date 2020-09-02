import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "./components/Login";
import RedirectPage from "./components/404";
import CampaignDetails from './components/campaignDetails';
import CharacterInfo from './components/characterInfo';
import CreateEnv from './components/createEnv';
import GameInfo from './components/gameInfo';
import PulseLoader from 'react-spinners/PulseLoader';
import { handleGrab5e } from './actions/5eInfo';
import {handleGrabCharacters} from './actions/characters';
import {handleGrabDraggable, 
        handleGrabOptions,
        handleNewEnvironment} from './actions/draggable';
import {handleGrabCampaigns, 
        handleChangeCampaign} from './actions/notes';
import {handleGrabNames} from './actions/user';


class Router extends Component {

	constructor(props){
		super(props);
        this.state = {};
		this.noDraggable = this.noDraggable.bind(this);
        this.noCharacter = this.noCharacter.bind(this);
	}

	componentDidMount(){
		this.props.handleGrabNames()
	}

    noGameInfo(){
        let temp = [<PulseLoader
              css={{display: 'block', margin: '0 auto', borderColor: 'red'}}
              size={150}
              color={"#123abc"}
              loading={true}
            />];
        if(!(Object.keys(this.props.dndInfo).length > 0)){
            this.props.handleGrab5e();
		} else {
            temp.push(<div><h1>Something is messing up </h1></div>)
		}
        return temp;
	}

    noDraggable(){
        let temp = [<></>];
        if(!(Object.keys(this.props.envOptions).length > 0)){
            this.props.handleGrabOptions(this.props.user.username);
            setTimeout(() => {if(this.props.envOptions.all !== undefined){this.props.handleGrabDraggable(this.props.envOptions.all[0], this.props.user.username)}}, 1000)
		} else if(!(Object.keys(this.props.draggable).length > 0)){
            this.props.handleGrabDraggable(this.props.envOptions.all[0], this.props.user.username);  
		} else {
            temp.push(<div><h1>Something is messing up </h1></div>)
		}
        return temp;
	}

    noCharacter(){
        let temp = [<></>];
        if(!(Object.keys(this.props.characters).length > 0)){
            this.props.handleGrabCharacters(this.props.user.username);
		} else {
            temp.push(<div><h1>Something is messing up </h1></div>)
		}
        return temp;
	}

    noCampaign(){
        let temp = [<></>];
        if(!(this.props.notesOptions.all.length > 0)){
            this.props.handleGrabCampaigns();
            setTimeout(() => {this.props.handleChangeCampaign(this.props.notesOptions.all[0])}, 1000)
		} else if(!(Object.keys(this.props.notepads).length > 0)){
              this.props.handleChangeCampaign(this.props.notesOptions.all[0])
		} else {
            temp.push(<div><h1>Something is messing up </h1></div>)
		}
        return temp;
	}

    render() {
      return (
        <div>
        <Switch>
                {(this.props.userStatus) ?  <><Route exact path="/">{(this.props.dndInfo.generalInfo) ? <GameInfo/> :
                <PulseLoader
                        css={{position: 'absolute', borderColor: 'red', top: '40vh', left: '35vw'}}
                        size={150}
                        color={"#123abc"}
                        loading={true}
                        onLoad={setTimeout(() => {this.noGameInfo()},1000)}
                     />
                }</Route>
                <Route path="/createenv"> {(Object.keys(this.props.draggable).length > 0) ? <CreateEnv/> : 
                    <PulseLoader
                        css={{position: 'absolute', borderColor: 'red', top: '40vh', left: '35vw'}}
                        size={150}
                        color={"#123abc"}
                        loading={true}
                        onLoad={setTimeout(() => {this.noDraggable()},1000) }
                     />
                }</Route>
                <Route path="/characterInfo"> {(Object.keys(this.props.characters).length > 0) ? <CharacterInfo/> : 
                    <PulseLoader
                        css={{position: 'absolute', borderColor: 'red', top: '40vh', left: '35vw'}}
                        size={150}
                        color={"#123abc"}
                        loading={true}
                        onLoad={setTimeout(() => {this.noCharacter()},1000)}
                     />
                }</Route>
                <Route path="/campaigndetails"> {(Object.keys(this.props.notepads).length > 0) ? <CampaignDetails/> :
                <PulseLoader
                        css={{position: 'absolute', borderColor: 'red', top: '40vh', left: '35vw'}}
                        size={150}
                        color={"#123abc"}
                        loading={true}
                        onLoad={setTimeout(() => {this.noCampaign()},1000)}
                     />
                }</Route>
                <Route path="/login" component={Login} /> </> 
                : <><Route path="/*" component={Login} /></>}
                <Route path="/why-are-you-trying-to-break-my-site" component={RedirectPage} />
                {(!this.props.userStatus) ? <Redirect exact from="/*" to="/login" /> : <></>}
                {(this.props.userStatus) ? <Redirect from="/*" to="/why-are-you-trying-to-break-my-site" /> : <></>}
        </Switch>
        </div>
      );
   }
}

const mapStateToProps = state => {
	return{
		dndInfo: state.dndInfo,
        draggable: state.draggable,
        envOptions: state.envOptions,
        notepads: state.notepads,
        notesOptions: state.notesOptions,
        userStatus: state.userStatus,
        characters: state.characters,
        user: state.user
	}
}

export default connect(mapStateToProps, {handleGrab5e, 
                                        handleGrabCharacters,  
                                        handleGrabDraggable, 
                                        handleGrabOptions, 
                                        handleGrabCampaigns, 
                                        handleChangeCampaign,
                                        handleNewEnvironment,
                                        handleGrabNames})(Router);
