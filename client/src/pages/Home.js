import React, { Component, Fragment }from 'react';
import SideMenu from '../components/Menu/SideMenu';
import TopMenu from '../components/Menu/TopMenu';
import Editor from '../components/Editor';

import * as service from '../service/auth';
import Resizable from 're-resizable';

import './Home.css';



class Home extends Component{
	constructor(){
		super();
		this.state ={
			user : sessionStorage.getItem('user_id'),
			test : '',
		};
	}
	
	componentWillMount(){
		this.checkLogin();
	};
	componentDidMount(){
		
	}
	checkLogin = async () =>{
		const token = sessionStorage.getItem('user');
		if(!token){
			alert('정상적인 접속이 아닙니다 !');
			return  window.location.href = '/login';
		}
		this.state.test = await service.loginCheck(this.props.host, token).then(
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
		console.log(e.clientX);
		let editor_container = this.refs.editor_container;
		console.log(editor_container);
		editor_container.style.marginLeft = (e.clientX + 50) + 'px';
	}


	render(){
		if(this.state.user){
			return(
			<Fragment>
				<section className="home_container">
					<article className="topMenu">
						<TopMenu user = {this.state.user}></TopMenu>
					</article>
					<Resizable className="side_menu_container"
						  defaultSize={{
							width:200,
							height: 1000
						  }}
							onResizeStop = {this.onResizeStop}
						>
						  <SideMenu></SideMenu>
					</Resizable>
					
					<article className="editor_container" ref="editor_container">
						<Editor></Editor>
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