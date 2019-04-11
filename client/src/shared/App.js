import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, SignUp } from '../pages/index';

class App extends Component {
	render(){
		return(
			<Fragment>
				<Route exact path="/" component={Home}/>
				<Route exact path="/Login" component={Login}/>
				<Route exact path="/SignUp" component={SignUp}/>
			</Fragment>
		);
	}
}

export default App;