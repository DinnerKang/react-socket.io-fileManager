import React, { Component, Fragment }from 'react';
import {Treebeard} from 'react-treebeard';
import * as service from '../../service/file';
import './SideMenu.css';

let clicks =0,
	timeout;

class SideMenu extends Component{
	
	
	
	constructor(props){
        super(props);
        this.state = {
			treeLayout: '',
			path : null,
			fileData: null,
		};
        this.onToggle = this.onToggle.bind(this);
		this.getPath();
    }
	
    onToggle(node, toggled){
		clicks++;
		if(clicks===1){
			timeout = setTimeout(function(){
				clicks = 0;
			},300);
		}else{
			clearTimeout(timeout);
			if(node.type === 'file'){
				this.getFile(node.path);
			}
			clicks= 0;
		}
		
        if(this.state.cursor){
			this.state.cursor.active = false;
		}
		
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
	onChange = async (e) =>{
		e.preventDefault();
		
		let formData = new FormData();
		const myFile = document.getElementById('myFile').files[0];
		if(!myFile){
			return;
		}
		formData.append('user', sessionStorage.getItem('user_id'));
		formData.append('myFile', myFile);
		
		try{
			const insertFile = await service.insertFile(this.props.host, formData);
			const path = await insertFile.data.path.children[0];
			path['id'] = 'root';
			path['toggled'] = 'true';
			this.setState({ path : path });
		}catch(e){
			this.getPath();
		}
	};

	getPath = async () =>{
		const user = sessionStorage.getItem('user_id');
		try{
			const getTree = await service.getTree(this.props.host, user);
			const path = getTree.data.path.children[0];
				path['id'] = 'root';
				path['toggled'] = 'true';
				this.setState({ path : path });
		}catch(e){
			this.setState({ path : 'check'});
			console.log('파일 선택해야하는 유저');
		}
	}
	
	getFile = async (path) =>{
		const getFile = await service.getFile(this.props.host, {path : path});
		this.setState({ fileData : getFile.data });
		this.props.getFormDataFromParent(getFile.data, path);
	}

	render(){
		let treeLayout;
		if(this.state.path == null){
			treeLayout = <div>loading</div>;
		}else if(this.state.path === 'check'){
			treeLayout = <form  encType="multipart/form-data">
						<label className="file_label">파일 업로드
						<input type="file" name="myFile" id="myFile" onChange={this.onChange} accept=".zip, .gzip, .gz"></input></label>
					</form>;
		}else{
			treeLayout = <Treebeard
						data={this.state.path}
						onToggle={this.onToggle}
			/>;
		}
		 
		
		return (
			<Fragment>
					{treeLayout}
			</Fragment>
		);
	}
};
//const content = document.getElementById('content');

export default SideMenu;