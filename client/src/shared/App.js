import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, SignUp } from '../pages/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel);



class App extends Component {
	
	state={
		host : 'https://test-front-vfbal.run.goorm.io',
	};
	
	render(){
		return(
			<Fragment>
				<Route render={ (props) => <Home {...props} host={this.state.host}></Home> } exact path="/" />
				<Route render={ (props) => <Login {...props} host={this.state.host}></Login> } exact path="/Login"/>
				<Route render={ (props) => <SignUp {...props} host={this.state.host}></SignUp> } exact path="/SignUp"/>
			</Fragment>
		);
	}
}


export default App;