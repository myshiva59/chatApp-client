import React from 'react';
import socketIoClient from 'socket.io-client';

class IO extends React.Component {
	state = {
		response: false,
		endpoint: 'http://127.0.0.1:80'
	};

	componentDidMount() {
		const socket = socketIoClient(this.state.endpoint);
		socket.on('news', data => console.log(data.hello));
		socket.emit('other event', { name: 'shiva' });
	}
	changeHandler(e) {
		console.log(e.target.value);
	}
	render() {
		return (
			<div>
				<h1>IO Module</h1>
				<input type='text' onChange={this.changeHandler} />
			</div>
		);
	}
}

export default IO;
