import React, { Component, Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../css/Login.css';

class SignUp extends Component{
	
	
	state = {
		user_id : '',
		user_pwd : '',
	};

	handleChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	
	onSubmit = () =>{
		console.log(this.state.user_id, this.state.user_pwd);
		
		// 빈공간 체크
		if(!this.state.user_id || !this.state.user_pwd){
			console.log('no');
			alert('정확하게 입력해주세요');
			return;
		}
		// 중복값 체크 준비
		
		this.props.history.push('/Login');
	}
	
	render(){
		return(
		<Fragment>
			<article className="container">
				<div className="col align-self-center logo_container">
					<h1>Sign Up</h1>
				</div>
				<div className="col-6 align-self-center margin_center">
					<Form className="login_form" onSubmit={this.onSubmit}>
						 <Form.Group controlId="formBasicEmail">
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
							<Button className="btn" variant="outline-secondary" type="submit">Sign up</Button>
						</div>
					</Form>
				</div>
			</article>	
		</Fragment>
		
		)
	}
};

export default SignUp;