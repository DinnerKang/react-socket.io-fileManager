import React, { Component, Fragment }from 'react';
import { Button, Form } from 'react-bootstrap';
import './ConnectUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class ConnectUser extends Component{
	constructor(props){
		super(props);
		this.state={
			show_text : '전체 사용자 보기',
			all_chat_msg: '',
			get_all_chat_msg: [],
			whisper_user: '',
			whisper_chat_msg: [],
			now_user: []
		};
	}
	componentWillMount(){
		const that = this;
		this.props.socket.on('all_msg', function(data){
			let align = [];
			for(let i =0, len= data.length; i<len;i++){
				align.unshift(data[i]);
			}
			
			that.setState({get_all_chat_msg : align}, function(){
				that.refs.chatting.scrollTop = that.refs.chatting.scrollHeight;
			});
			
		});
		this.props.socket.on('new_all_msg', function(data){
			that.setState({
				get_all_chat_msg : that.state.get_all_chat_msg.concat(data)
			}, function(){ that.refs.chatting.scrollTop = that.refs.chatting.scrollHeight;});
			console.log('새로운 메시지', data);
		});
		
		this.props.socket.on('whisper', function(data){
			console.log('귓속말 !', data);
			let align = [];
			for(let i =0, len= data.length; i<len;i++){
				align.unshift(data[i]);
			}
			
			that.setState({whisper_chat_msg : align}, function(){
				that.refs.chatting.scrollTop = that.refs.chatting.scrollHeight;
			});
		});
		
		this.props.socket.on('new_whisper', function(data){
			that.setState({
				whisper_chat_msg : that.state.whisper_chat_msg.concat(data)
			}, function(){ that.refs.chatting.scrollTop = that.refs.chatting.scrollHeight;});
			console.log('귓속말 메시지', data);
		});
		
	};
	componentWillReceiveProps(nextProps){
		this.setState({now_user : nextProps.now_user});
		
	}
	showUsers = () =>{
		let show_all = this.refs.show_all;
		let show_event = this.refs.show_event;
		
		if(this.refs.show_event.innerText === '전체 사용자 보기'){
			this.setState({show_text : '닫기'});
			show_all.style.height = 'calc(100vh - 56px)';
			show_all.style.overflowY= 'auto';
			show_event.classList.add('user_list');
		}else{
			this.setState({show_text : '전체 사용자 보기'});
			show_all.style.height = '25px';
			show_all.style.overflowY= 'hidden';
			show_event.classList.remove('user_list');
		}
	};
	showAllChat = () =>{

		this.refs.chat_all.style.bottom = '298px';
		this.refs.whisper_block.style.bottom = '298px';
			
		this.refs.chat_area.style.top = '-300px';
		
		this.refs.all_chat_area.style.display = 'block';
		this.refs.whisper_chat_area.style.display='none';
	};

	closeAllChat = () =>{
		this.refs.chat_all.style.bottom = '0px';
		this.refs.whisper_block.style.bottom = '0px';
			
		this.refs.chat_area.style.top = '0px';
	};
	
	showWhisperChat = () =>{
		this.refs.chat_all.style.bottom = '298px';
		this.refs.whisper_block.style.bottom = '298px';
			
		this.refs.chat_area.style.top = '-300px';
		
		
		this.refs.all_chat_area.style.display = 'none';
		this.refs.whisper_chat_area.style.display='block';
	}
	
	closeWhisperChat= () =>{
		
		if(this.refs.whisper_block.style.bottom ==='0px' || !this.refs.whisper_block.style.bottom){
			this.refs.whisper_block.style.display = 'none';
		}
		this.refs.chat_all.style.bottom = '0px';
		this.refs.whisper_block.style.bottom = '0px';
			
		this.refs.chat_area.style.top = '0px';
		
	}
	handleChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		});
	};
	chatSend = (e) =>{
		e.preventDefault();
		if(this.refs.whisper_chat_area.style.display==='block'){
			this.props.socket.emit("message", {
				sender : sessionStorage.getItem('user_id'),
				recepient: this.state.whisper_user,
				message: this.state.all_chat_msg 
			});
		}else{
			this.props.socket.emit("message", {
				sender : sessionStorage.getItem('user_id'),
				recepient: 'ALL',
				message: this.state.all_chat_msg 
			});
		}
		this.setState({ all_chat_msg : '' });
	};

	whisperSend = (e) =>{
		this.props.socket.emit("message", {
			sender : sessionStorage.getItem('user_id'),
			recepient: this.state.whisper_user,
			message: this.state.all_chat_msg 
		});
	};

	whisperUser = (data) =>{
		if(data.id === sessionStorage.getItem('user_id')){
			return alert('자기 자신에게 귓속말을 보낼수 없습니다');
		}
		
		this.props.socket.emit('whisper_msg', {
			sender : data.id,
			recepient: sessionStorage.getItem('user_id'),
		});
		
		this.setState({ whisper_user: data.id });
		this.refs.whisper_block.style.display = 'block';
	};
	userCheck = (data) =>{
		let now_user = Object.keys(this.state.now_user);
		if(now_user.indexOf(data) > -1){
			return true
		}
		return false;
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
							<li key={data.id} className="user_list" onClick={this.whisperUser.bind(this, data)}>
								<div className="user_text">{data.id}</div>
								<div className={this.userCheck(data.id) ? 'active_user' : 'deactive_user'}></div>
							 </li>
						 )}
					</ul>
					<div className="chat_all_container">
						<div className="chat_all" ref="chat_all" >
							<div className="user_title" onClick={this.showAllChat}>전체 채팅</div>
							<FontAwesomeIcon className="close_whisper" icon={faTimes} onClick={this.closeAllChat}/>
						</div>
						<div className="chat_whisper" ref="whisper_block" >
							<div className="user_title" onClick={this.showWhisperChat}>{this.state.whisper_user}</div>
							<FontAwesomeIcon className="close_whisper" icon={faTimes} onClick={this.closeWhisperChat}/>
						</div>
						<div className="chat_container">
							<div className="chat_area" ref="chat_area">
								<div className="chatting" ref="chatting">
									<div className="all_chat_area" ref="all_chat_area">
										{this.state.get_all_chat_msg.map(
										 (c, idx) => {
											 if(c.sender === sessionStorage.getItem('user_id')){
												 return <div className="chat_user me" key={idx}>
														 <div className="sender">{c.sender}</div> <div>{c.message}</div>
														 </div>;
											 }else{
												  return <div className="chat_user" key={idx}>
														  <div className="sender">{c.sender}</div> <div>{c.message}</div>
														</div>;
											 }
										 }
										)}
									</div>
									<div className="whisper_chat_area" ref="whisper_chat_area">
										{this.state.whisper_chat_msg.map(
										 (c, idx) => {
											 if(c.sender === sessionStorage.getItem('user_id')){
												 return <div className="chat_user me" key={idx}>
														 <div className="sender">{c.sender}</div> <div>{c.message}</div>
														 </div>;
											 }else{
												  return <div className="chat_user" key={idx}>
														  <div className="sender">{c.sender}</div> <div>{c.message}</div>
														</div>;
											 }
										 }
										)}
									</div>
								</div>
								<Form onSubmit={this.chatSend}>
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