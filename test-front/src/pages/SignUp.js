import React from 'react';
import { Button, Form } from 'react-bootstrap';
import '../css/Login.css';

const SignUp = () =>{
	return(
		<React.Fragment>
			<article className="container">
				<div className="row">
				</div>
				<div className="col align-self-center logo_container">
					Sign Up
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
							<Button className="btn" variant="outline-secondary" type="button">Sign up</Button>
						</div>
					</Form>
				</div>
			</article>	
		</React.Fragment>
		
	)
};

export default SignUp;