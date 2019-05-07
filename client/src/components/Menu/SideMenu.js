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
	onChange = (e) =>{
		e.preventDefault();
		
		let formData = new FormData();
		const myFile = document.getElementById('myFile').files[0];
		if(!myFile){
			return;
		}
		formData.append('user', sessionStorage.getItem('user_id'));
		formData.append('myFile', myFile);
		
		
		service.insertFile(this.props.host, formData).then(
			res=>{
				let path = res.data.path.children[0];
				path['id'] = 'root';
				path['toggled'] = 'true';
				this.setState({ path : path });
			},
			err=>{
				console.log(err);
				this.getPath();
			}
		);
	};

	getPath = () =>{
		const user = sessionStorage.getItem('user_id');
		service.getTree(this.props.host, user).then(
			res=>{
				let path = res.data.path.children[0];
				path['id'] = 'root';
				path['toggled'] = 'true';
				this.setState({ path : path });
			},
			err=>{
				this.setState({ path : 'check'});
				console.log('파일 선택 해야함');
			}
		);
	}
	
	getFile = (path) =>{
		console.log(path);
		service.getFile(this.props.host, {path : path}).then(
			res =>{
				this.setState({ fileData : res.data });
				this.props.getFormDataFromParent(res.data, path);
			},
			err =>{
				console.log(err);
			}
		)
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