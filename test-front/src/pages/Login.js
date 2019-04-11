import React from 'react';
import { Button } from 'react-bootstrap';


const Login = () =>{
	const logo = require('../assets/logo.png');
	
	return(
		<React.Fragment>
			<div>
				<img src={logo} alt="logo"></img>
			</div>	
			<div>
				<Button variant="outline-primary">Login</Button>
			</div>
			
		</React.Fragment>
		
	)
};

export default Login;