import React, { Component, Fragment }from 'react';
import * as service from '../../service/auth';
import { Button, Form } from 'react-bootstrap';
import './ConnectUser.css';





class ConnectUser extends Component{
	constructor(props){
		super(props);
		this.state={
			show_text : '전체 사용자 보기',
			show_chat : '전체 채팅',
			all_chat_msg: '',
		};
	}
	componentWillMount(){
		this.props.socket.on('all_msg', function(data){
			console.log(data);
		});
	};
	
	showUsers = () =>{
		let show_all = this.refs.show_all;
		let show_event = this.refs.show_event;
		
		if(this.refs.show_event.innerText === '전체 사용자 보기'){
			this.setState({show_text : '닫기'});
			show_all.style.height = 'calc(100vh - 56px)';
			show_event.classList.add('user_list');
		}else{
			this.setState({show_text : '전체 사용자 보기'});
			show_all.style.height = '25px';
			show_event.classList.remove('user_list');
		}
	};
	showAllChat = () =>{

		if(this.state.show_chat === '전체 채팅'){
			this.refs.chat_all.style.bottom = '298px';
			this.refs.chat_area.style.top = '-300px';
			this.setState({show_chat : '닫기'});
		}else{
			this.refs.chat_all.style.bottom = '0px';
			this.refs.chat_area.style.top = '0px';
			this.setState({show_chat : '전체 채팅'});
		}
	}
	
	handleChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		});
	};
	allChatSend = (e) =>{
		e.preventDefault();
		this.props.socket.emit("all_msg", {
			sender : sessionStorage.getItem('user_id'),
			recepient: 'ALL',
			message: this.state.all_chat_msg 
		});
		this.setState({ all_chat_msg : '' });
	};
	
	render(){
			return(
				<Fragment>
					<ul className="show_all" ref="show_all">
						<li onClick={this.showUsers} ref="show_event" className="show_title">
							<div>{this.state.show_text}
							</div>
						</li>
						{this.props.user_info.map( (data) =>
							<li key={data.id} className="user_list">
								<div className="user_text">{data.id}</div>
								<div className={data.state ? 'active_user' : 'deactive_user'}></div>
							 </li>
						 )}
					</ul>
					<div className="chat_all_container">
						<div className="chat_all" ref="chat_all" onClick={this.showAllChat}>
							{this.state.show_chat}
						</div>
						<div className="chat_container">
							<div className="chat_area" ref="chat_area">
								<div className="chatting">
									
								</div>
								<Form onSubmit={this.allChatSend}>
									<Form.Control type="text" placeholder="메세지" name="all_chat_msg" className="msg_area"
									onChange={this.handleChange} value={this.state.all_chat_msg} autoComplete="off"/>
									<Button variant="outline-primary" className="msg_btn" type="submit">
									보내기
									  </Button>
								</Form>
							</div>
						</div>
						
					</div>
					
				</Fragment>

			)
	}
};

export default ConnectUser;