import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import './Chart.css';

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(undefined);

	const ENDPOINT = 'https://chat-app-serverx.herokuapp.com/';

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setName(name);
		setRoom(room);

		socket.emit('join', { name, room }, error => {
			if (error) {
				alert(error);
				setError(error);
			}
		});
		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', message => {
			setMessages([...messages, message]);
		});
		socket.on('roomData', ({ room, users }) => {
			setUsers(users);
		});
	}, [messages]);

	// function for sending message
	const sendMessage = event => {
		event.preventDefault();
		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};
	console.log(users);
	return (
		<div>
			{error !== undefined ? (
				<div>
					<h2>{error}</h2>
					<a href='/'>Home</a>
				</div>
			) : (
				<div className='outerContainer'>
					<div className='container'>
						<InfoBar room={room} />
						<Messages messages={messages} name={name} />
						<Input
							message={message}
							setMessage={setMessage}
							sendMessage={sendMessage}
						/>
					</div>
					<TextContainer users={users} />
				</div>
			)}
		</div>
	);
};

export default Chat;
