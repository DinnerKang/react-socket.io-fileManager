import React, { Component, Fragment }from 'react';
import SideMenu from '../components/SideMenu';
import Editor from '../components/Editor';
import ConnectUser from '../components/ConnectUser';
import axios from 'axios';

import '../css/Home.css';

class Home extends Component{
	componentWillMount(){
		const token = sessionStorage.getItem('user');
		console.log(token);
		if(!token){
			alert('정상적인 접속이 아닙니다 !');
			return  window.location.href = '/login';
		}
		
		axios.get(`${this.props.host}/api/auth/check`, {  headers:{"x-access-token": token} }).then(
			res=>{
				console.log(res);
			},
			err=>{
				console.log(err);
				alert('정상적인 접속이 아닙니다.');
				return  window.location.href = '/login';
			}
		);
	}
	
	render(){
		return(
			<Fragment>
				<section className="home_container">
					<article className="sideMenu">
						<SideMenu></SideMenu>
					</article>
					<article className="editor">
						<Editor></Editor>
					</article>
					<article className="connectUser">
						<ConnectUser></ConnectUser>
					</article>
				</section>
				
			</Fragment>

		)
	}
};

export default Home;