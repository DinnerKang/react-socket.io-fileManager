import React, { Component, Fragment }from 'react';
import {Treebeard} from 'react-treebeard';
import axios from 'axios';

const data = {
	id:'root',
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};


class SideMenu extends Component{
	constructor(props){
        super(props);
        this.state = {
			file:null
		};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
	onChange = (e) =>{
		e.preventDefault();
		
		let formData = new FormData();
		const myFile = document.getElementById('myFile').files[0];
		
		formData.append('user', sessionStroage.getItem('user_id'));
		formData.append('myFile', myFile);
		
		
		console.log(formData.get('myFile'));
		
		
		axios.post(`${this.props.host}/api/file`, formData).then(
			res=>{
				console.log(res);
			}
		)
	};

	render(){
			return(
				<Fragment>
					<form  encType="multipart/form-data" >
						<input type="file" name="myFile" id="myFile" onChange={this.onChange}></input>
					</form>
					
					
					<Treebeard
						data={data}
						onToggle={this.onToggle}
					/>
					
					
					
				</Fragment>

			)
	}
};
const content = document.getElementById('content');

export default SideMenu;