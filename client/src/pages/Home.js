import React, { Component, Fragment }from 'react';
import SideMenu from '../components/Menu/SideMenu';
import TopMenu from '../components/Menu/TopMenu';
import Editor from '../components/Editor';
import ConnectUser from '../components/Chat/ConnectUser';

import * as service from '../service/auth';
import Resizable from 're-resizable';

import './Home.css';


import io from 'socket.io-client';

const socket = io.connect('https://test-front-vfbal.run.goorm.io/',{
	transport : ['websocket']
});

class Home extends Component{
	constructor(){
		super();
		this.state ={
			user : sessionStorage.getItem('user_id'),
			fileData : '',
			fileSave: '',
			filePath: '',
		};
	}
	
	componentWillMount(){
		window.addEventListener("beforeunload", (ev) => 
		{  
			ev.preventDefault();
			socket.emit('logout',{
				user_id : sessionStorage.getItem('user_id')
			});
		});
		this.checkLogin();
	};
	componentDidMount(){

		socket.emit("login", {
   	  		 user_id: sessionStorage.getItem('user_id')
   		 });
		
		socket.on('login', function(data){
			console.log('로그인 했습니다 :', data);
		});
		
		socket.on('logout', function(){
			socket.disconnect();
		});
	};
	
	checkLogin = async () =>{
		const token = sessionStorage.getItem('user');
		if(!token){
			return  window.location.href = '/login';
		}
		service.loginCheck(this.props.host, token).then(
			res=>{
				console.log(res);
			},
			err=>{
				alert('정상적인 접속이 아닙니다.');
				return  window.location.href = '/login';
			}
		);
	};
	onResizeStop = (e) =>{
		let editor_container = this.refs.editor_container;
		editor_container.style.width = 'calc(100% - ' + (e.clientX + 10) + 'px)';
		editor_container.style.marginLeft = (e.clientX + 10) + 'px';
	};
	getFormData = (data, path) =>{
		console.log('home  e', data, path);
		this.setState({fileData : data, filePath: path});
	};
	
	render(){
		if(this.state.user){
			return(
			<Fragment>
				<section className="home_container">
					<article className="topMenu">
						<TopMenu user = {this.state.user} socket = {socket}></TopMenu>
					</article>
					<Resizable className="side_menu_container"
						  defaultSize={{
							width:200,
							height: 1000
						  }}
							onResizeStop = {this.onResizeStop}
						>
						  <SideMenu host={this.props.host} getFormDataFromParent = {this.getFormData} ></SideMenu>
					</Resizable>
					
					<article className="editor_container" ref="editor_container">
						<Editor fileData = {this.state.fileData} path= {this.state.filePath} host={this.props.host} ></Editor>
					</article>
					<article className="connectUser_container">
						<ConnectUser host={this.props.host} socket = {socket}></ConnectUser>
					</article>
				</section>
			</Fragment>
			)
		}else{
			return(
				<div>정상적인 접속이 아닙니다.</div>
			)
			
		}
		
		
	}
	
};

export default Home;