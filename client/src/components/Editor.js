import React, { Component, Fragment }from 'react';
import * as service from '../service/file';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import './Editor.css';


class Editor extends Component{
	
	constructor(props){
        super(props);
        this.state = {
			treeLayout: '',
			now_path : null,
			file_data: '',
			head_key: [],
			head_name: [],
			icons : [],
		};
    }
	keydownHandler = (e) =>{
		if(e.ctrlKey && e.keyCode === 83){
			e.preventDefault();
			console.log('ctrl + s');
			service.saveFile(this.props.host, this.props.path, this.state.file_data).then(
				res=>{
					console.log(res);
				}
			);
		}
	}
	
	componentDidMount(){
		document.addEventListener('keydown', this.keydownHandler);
	};

	componentWillReceiveProps(nextProps) {
		let head_index = this.state.head_key.indexOf(nextProps.path);
		if(head_index > -1 ){
			if(Object.keys(this.refs).length > 0){
				for(let i=0, len = this.state.head_key.length; i<len ;i++){
					this.refs['list_'+i].style.backgroundColor = '#5D5D5D';
				}
			}
			this.refs['list_'+head_index].style.backgroundColor = '#C9C9C9';
			return;
		}
		
	  	this.setState({ 
			file_data : nextProps.fileData,
			head_key: this.state.head_key.concat(nextProps.path),
			head_name: nextProps.path.split('/').length -1,
			icons : this.state.icons.concat(faTimes)
		});
		
			
		if(Object.keys(this.refs).length > 0){
			for(let i=0, len = this.state.head_key.length; i<len ;i++){
				this.refs['list_'+i].style.backgroundColor = '#5D5D5D';
			}
		}
	}

	handleChange = (e) =>{
		this.setState({ 
			file_data : e.target.value
		});

	};
	closeEditor = (e, idx) =>{
		if(idx!= 0){
			if(Object.keys(this.refs).length > 0){
				for(let i=0, len = this.state.head_key.length; i<len ;i++){
					this.refs['list_'+i].style.backgroundColor = '#5D5D5D';
				}
			}
			this.refs['list_'+(idx-1)].style.backgroundColor = '#C9C9C9';
			
			service.getFile(this.props.host, {path: this.state.head_key[idx-1]} ).then(
				res =>{
					this.setState({file_data: res.data });
				}
			);
		}
		
		// service.getFile(this,props.host)
		this.setState({
			head_key : this.state.head_key.filter(info => info !== e)
		});
	};

	render(){
			return(
				<Fragment>
					<ul className="editor_header_container">
						{this.state.head_key.map( (c, idx)=> 
							<li className="editor_header" id={'list_'+idx} ref={'list_'+idx} key={c}>{c.split('/')[this.state.head_name]}
							<FontAwesomeIcon className="head_icon" icon={this.state.icons[idx]} onClick={this.closeEditor.bind(this, c, idx)}/></li>)
						}
					</ul>
					<textarea className="editor" value={this.state.file_data} onChange={this.handleChange}></textarea>
					
					
					
				</Fragment>

			)
	}
};

export default Editor;