import React, { Component, Fragment }from 'react';
import SideMenu from '../components/SideMenu';
import Editer from '../components/Editer';
import ConnectUser from '../components/ConnectUser';
import axios from 'axios';

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
				<article>
					<SideMenu></SideMenu>
					<Editer></Editer>
					<ConnectUser></ConnectUser>
				</article>
			</Fragment>

		)
	}
};

export default Home;