import React, { Component, Fragment }from 'react';
import { Button, Form } from 'react-bootstrap';
import * as service from '../service/auth';
import './Login.css';

class Login extends Component {
	constructor(props){
        super(props);
		this.state = {
			logo : require('../assets/cloud.jpg'),
			user_id : '',
			user_pwd : '',
		};
	}
	
	moveSignUp = () =>{
		this.props.history.push('/SignUp');
	};

	handleChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		});
	};
	

	onLogin = async (e) =>{
		e.preventDefault();
			const id = this.state.user_id;
			const password = this.state.user_pwd;
			if(!id || !password){
				alert('다시한번 확인해주세요');
				return;
			}
		try{
			const loginData = await service.onLogin(this.props.host, id, password);
			await sessionStorage.setItem('user', loginData.data.token);
			await sessionStorage.setItem('user_id', id);
			await this.props.history.push('/');
		}catch(e){
			if(e.response.status === 500){
					alert('네트워크 오류 입니다.');
			}
		}
			
	};
	
	render(){
		sessionStorage.clear();
		return(
			<Fragment>
				<article className="container">
					<div className="col align-self-center logo_container">
						<img src={this.state.logo} alt="logo"></img>
					</div>
					<div className="col-6 align-self-center margin_center">
						<Form className="login_form" onSubmit={this.onLogin}>
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
							  <Button className="btn" variant="outline-primary" type="submit">
								Sign in
							  </Button>
								<Button className="btn" variant="outline-secondary" type="button"
									onClick={this.moveSignUp}>
									Sign up</Button>
							</div>

						</Form>
					</div>
				</article>	
			</Fragment>
		)
	}
	
};

export default Login;