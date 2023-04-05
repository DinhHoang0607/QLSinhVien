import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditStudent from './components/EditStudent';
import { ToastContainer } from 'react-toastify';

function App() {
	const [token, setToken] = useState('');
	// const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			getToken();
		}, 2000);
	}, []);
	const getToken = async () => {
		setLoading(true);
		try {
			const { data: response } = await axios.post(
				'http://localhost:9090/oauth/token',
				{
					username: 'trungkb',
					password: '123456',
					grant_type: 'password',
				},
				{
					auth: {
						username: 'a08',
						password: 'secret',
					},
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			setToken(response.access_token);
		} catch (error) {
			console.error(error.message);
		}
		setLoading(false);
	};
	console.log();
	if (loading) {
		return (
			<div
				className='body-loading'
				// style={{
				// 	backgroundImage: `url("https://cdn.pixabay.com/photo/2018/04/28/22/03/tree-3358468_960_720.jpg")`,
				// }}
			>
				<h1 className='title'>Loading</h1>
				<div className='rainbow-marker-loader'></div>
			</div>
		);
	}
	return (
		<div className='container-app'>
			<Router>
				<Routes>
					<Route path='/' element={<Home token={token} />} />
					<Route path='/create' element={<AddStudent token={token} />} />
					<Route path='/edit/:id' element={<EditStudent token={token} />} />
				</Routes>
			</Router>
			<ToastContainer />
		</div>
	);
}

export default App;
