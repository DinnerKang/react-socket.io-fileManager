import React, { Component, Fragment }from 'react';


class Home extends Component{
	render(){
		return(
			<Fragment>
				<div>
					<h1> hi {this.props.test}</h1>
				</div>
			</Fragment>

		)
	}
};

export default Home;