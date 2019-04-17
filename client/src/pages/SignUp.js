import React, { Component, Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as service from '../service/auth';

import './Login.css';

class SignUp extends Component{
	
	
	state = {
		user_id : '',
		user_pwd : '',
	};

	handleChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		});
	};
	
	onSubmit = () =>{
		const id = this.state.user_id;
		const password = this.state.user_pwd;
		// 빈공간 체크
		if(!id || !password){
			alert('정확하게 입력해주세요');
			return;
		}
		
		
		service.signUp(this.props.host, id, password).then(
			res=>{
				console.log('회원가입 성공');
				alert('회원가입이 성공했습니다.');
				this.props.history.push('/Login');
			},
			err=>{
				if(err.response.status === 501){
					alert('이미 사용중인 ID 입니다.');
				}
				if(err.response.status === 500){
					alert('네트워크 오류 입니다.');
				}
			}
		);
	};
	
	render(){
		return (
			<Fragment>
				<article className="container">
					<div className="col align-self-center logo_container">
						<h1>Sign Up</h1>
					</div>
					<div className="col-6 align-self-center margin_center">
						<Form className="login_form">
							 <Form.Group controlId="formBasicText">
								<Form.Label>ID</Form.Label>
								<Form.Control type="text" placeholder="ID" name="user_id" 
									onChange={this.handleChange} value={this.state.user_id}/>
							  </Form.Group>

							  <Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" name="user_pwd"
									onChange={this.handleChange} value={this.state.user_pwd} />
							  </Form.Group>
							<div className="btn_container">
								<Button className="btn" variant="outline-secondary" type="button" onClick={this.onSubmit}>Sign up</Button>
							</div>
						</Form>
					</div>
				</article>	
			</Fragment>
		)
	};
};

export default SignUp;