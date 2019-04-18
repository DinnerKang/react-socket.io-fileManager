import React, { Component, Fragment }from 'react';
import './Editor.css';

class Editor extends Component{
	
	constructor(props){
        super(props);
        this.state = {
			treeLayout: '',
			path : null,
		};
    }


	render(){
			return(
				<Fragment>
					<textarea className="editor" value={this.props.fileData}></textarea>
				</Fragment>

			)
	}
};

export default Editor;