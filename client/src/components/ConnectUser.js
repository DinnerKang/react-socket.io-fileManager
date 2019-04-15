import React, { Component, Fragment }from 'react';
import { Button, Form } from 'react-bootstrap';

import Chat from './Chat';
import Whisper from './Whisper';

class ConnectUser extends Component{
	
	render(){
			return(
				<Fragment>
					<ul>
						<li><Chat></Chat></li>
						<li><Whisper></Whisper></li>
					</ul>
				</Fragment>

			)
	}
};

export default ConnectUser;