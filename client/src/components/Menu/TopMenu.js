import React, { Component, Fragment }from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './TopMenu.css';

class TopMenu extends Component{
	
	
	onLogout = () =>{
		sessionStorage.clear();
	}
	
	render(){
		
			return(
				<Fragment>
					  <Navbar bg="dark" variant="dark">
						 <span className="logo">Cloud</span>
						<Navbar.Brand className="nav_text">ID : {this.props.user}</Navbar.Brand>
						<Nav>
						  <Nav.Link href="/Login" onClick={this.onLogout}>Logout</Nav.Link>
						</Nav>
					  </Navbar>
				</Fragment>

			)
	}
};

export default TopMenu;