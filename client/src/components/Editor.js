import React, { Component, Fragment }from 'react';
import * as service from '../service/file';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
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
	
	
	// 저장
	saveFile = () => {
		if(!this.state.now_path){
			return;
		}
		service.saveFile(this.props.host, this.state.now_path, this.state.file_data).then(
			res=> {
				alert('저장 완료');
			},
			err =>{
				alert('저장 오류');
			}
		);
	}
	
	keydownHandler = (e) =>{
		if(e.ctrlKey && e.keyCode === 83){
			e.preventDefault();
			this.saveFile();
		}
	}
	
	componentDidMount(){
		document.addEventListener('keydown', this.keydownHandler);
	};

	componentWillReceiveProps(nextProps) {
		if(nextProps.path===""){
			return;
		}
		
		// 10개 제한
		if(this.state.head_key.length === 10){
			alert('최대 10개까지 띄울수 있습니다.');
			return;
		}
		let head_index = this.state.head_key.indexOf(nextProps.path);
		// 같은게 있으면
		if(head_index > -1 ){
			if(Object.keys(this.refs).length > 0){
				for(let i=0, len = this.state.head_key.length; i<len ;i++){
					this.refs['list_'+i].style.backgroundColor = '#5D5D5D';
				}
			}
			this.refs['list_'+head_index].style.backgroundColor = '#C9C9C9';
			this.getData(nextProps.path);
			return;
		}
		
	  	this.setState({
			now_path : nextProps.path,
			file_data : nextProps.fileData,
			head_key: this.state.head_key.concat(nextProps.path),
			head_name: this.state.head_name.concat(nextProps.path.split('/').length -1),
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
		// head list 삭제
		let arr = [...this.state.head_name];
		arr.splice(idx,1);
		
		this.setState({
			head_key : this.state.head_key.filter(info => info !== e),
			head_name: arr
		});
		
		// 만약 리스트가 0개 되면
		if(idx === 0 && !this.refs['list_1']){
			this.setState({
				head_key : this.state.head_key.filter(info => info !== e)
			});
			this.setState({file_data: ''});
			return;
		}
		// 현재 path 와 삭제하는 것과 같으면
		if(e === this.state.now_path){
			// idx가 0 + 현재 선택된 상태
			if(idx === 0){
				if(Object.keys(this.refs).length > 0){
					for(let i=0, len = this.state.head_key.length; i<len ;i++){
						this.refs['list_'+i].style.backgroundColor = '#5D5D5D';
					}
				}
				this.setState({ now_path : this.state.head_key[idx+1]});
				this.refs['list_'+(idx+1)].style.backgroundColor = '#C9C9C9';
				this.getData(this.state.head_key[idx+1]);
			}else{
				// idx가 0 아닐때
				if(Object.keys(this.refs).length > 0){
					for(let i=0, len = this.state.head_key.length; i<len ;i++){
						this.refs['list_'+i].style.backgroundColor = '#5D5D5D';
					}
				}
				this.setState({ now_path : this.state.head_key[idx-1]});
				this.refs['list_'+(idx-1)].style.backgroundColor = '#C9C9C9';
				this.getData(this.state.head_key[idx-1]);
			}
		}
		
	};

	getHeadData = (path, idx) =>{
		this.setState({now_path : path });
		if(Object.keys(this.refs).length > 0){
				for(let i=0, len = this.state.head_key.length; i<len ;i++){
					this.refs['list_'+i].style.backgroundColor = '#5D5D5D';
				}
			}
		this.refs['list_'+idx].style.backgroundColor = '#C9C9C9';
		this.getData(path);
	};
	getData = (path) =>{
		service.getFile(this.props.host, {path: path} ).then(
				res =>{
					this.setState({file_data: res.data });
				}
		);
	};
	render(){
			return(
				<Fragment>
					<ul className="editor_header_container">
						{this.state.head_key.map( (c, idx)=> 
							<li className="editor_header" id={'list_'+idx} ref={'list_'+idx} key={c} >
								<div onClick={this.getHeadData.bind(this, c, idx)} title={c.split('/')[this.state.head_name[idx]]}>
									{c.split('/')[this.state.head_name[idx]]}
								</div>
							<FontAwesomeIcon className="head_icon" icon={this.state.icons[idx]} onClick={this.closeEditor.bind(this, c, idx)}/></li>)
						}
					</ul>
					<textarea className="editor" value={this.state.file_data} onChange={this.handleChange}></textarea>
					<Button variant="outline-secondary" className="saveBtn" type="button"  title="Ctrl+S" onClick={this.saveFile}>저장</Button>
				</Fragment>

			)
	}
};

export default Editor;