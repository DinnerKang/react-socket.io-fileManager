import React, { Component, Fragment }from 'react';
import { Button, Form } from 'react-bootstrap';
import '../css/Login.css';

class Login extends Component {
	
	state = {
		logo : require('../assets/cloud.jpg')
	};
	
	moveSignUp = () =>{
		console.log('MoveSignUp');
		this.props.history.push('/SignUp');
	}
	
	render(){
		return(
			<Fragment>
				<article className="container">
					<div className="col align-self-center logo_container">
						<img src={this.state.logo} alt="logo"></img>
					</div>
					<div className="col-6 align-self-center margin_center">
						<Form className="login_form">
							 <Form.Group controlId="formBasicEmail">
								<Form.Label>ID</Form.Label>
								<Form.Control type="email" placeholder="ID" />
							  </Form.Group>

							  <Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" />
							  </Form.Group>
							<div className="btn_container">
								<Button className="btn" variant="outline-secondary" type="button"
									onClick={this.moveSignUp}>
									Sign up</Button>
							  <Button className="btn" variant="outline-primary" type="submit">
								Sign in
							  </Button>
							</div>

						</Form>
					</div>
				</article>	
			</Fragment>
		)
	}
	
};

export default Login;