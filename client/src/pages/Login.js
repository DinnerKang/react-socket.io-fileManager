import React, { Component, Fragment }from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../css/Login.css';

class Login extends Component {
	
	state = {
		logo : require('../assets/cloud.jpg'),
		user_id : '',
		user_pwd : '',
	};
	
	moveSignUp = () =>{
		console.log('MoveSignUp');
		this.props.history.push('/SignUp');
	};

	handleChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		});
	};

	onLogin = () =>{
			const id = this.state.user_id;
			const password = this.state.user_pwd;
			axios.get(`${this.props.host}/api/auth/login`, {id, password}).then(
				res=>{
					console.log(res);
				}
			);
	};
	
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
								<Form.Control type="text" placeholder="ID" name="user_id"
									onChange={this.handleChange} value={this.state.user_id}/>
							  </Form.Group>

							  <Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" name="user_pwd"
									onChange={this.handleChange} value={this.state.user_pwd}/>
							  </Form.Group>
							<div className="btn_container">
								<Button className="btn" variant="outline-secondary" type="button"
									onClick={this.moveSignUp}>
									Sign up</Button>
							  <Button className="btn" variant="outline-primary" type="button" onClick={this.onLogin}>
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