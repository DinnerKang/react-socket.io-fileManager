import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, SignUp } from '../pages/index';


class App extends Component {
	
	state={
		host : 'https://test-front-vfbal.run.goorm.io',
	};
	
	render(){
		return(
			<Fragment>
				<Route exact path="/" component={Home} />
				<Route exact path="/Login" component={Login}/>
				<Route render={ props => <SignUp host={this.state.host}></SignUp> } exact path="/SignUp"/>
			</Fragment>
		);
	}
}

export default App;