import React from 'react';
// import IO from './IO';
import Join from './Join/Join';
import Chat from './Chart/Chat';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<Route path='/' exact component={Join} />
			<Route path='/chat' component={Chat} />
		</Router>
	);
};

export default App;
