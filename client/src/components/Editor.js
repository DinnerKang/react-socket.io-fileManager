import React, { Component, Fragment }from 'react';
import * as service from '../service/file';

import './Editor.css';

class Editor extends Component{
	
	constructor(props){
        super(props);
        this.state = {
			treeLayout: '',
			path : null,
			file_data: ''
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
	  this.setState({ file_data : nextProps.fileData});
	}

	handleChange = (e) =>{
		this.setState({ file_data : e.target.value});
		
	};
	
	render(){

			return(
				<Fragment>
					<ul className="editor_header_container">
						<li className="editor_header">head 1 <i classNmae="glyphicon glyphicon-remove">a</i></li>
						<li className="editor_header">head 2</li>
					</ul>
					<textarea className="editor" value={this.state.file_data} onChange={this.handleChange}></textarea>
				</Fragment>

			)
	}
};

export default Editor;