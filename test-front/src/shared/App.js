import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, SignUp } from 'pages';

class App extends Component {
	render(){
		return(
			<div>
				<Route exact path="/" component={Home}/>
				<Route exact path="/Login" component={Login}/>
				<Route exact path="/SignUp" component={SignUp}/>
			</div>
		);
	}
}

export default App;