import React, {useState, useEffect} from 'react';
import ProgressBar from '../components/progressBar';
import { Route } from 'react-router-dom';
import HomeContent from '../context/homeContent';

const HomePage = ({match}) => {
	const [p, setP] = useState(0);
	const [c, setC] = useState(0);
	const [f, setF] = useState(0);

	useEffect(() => {
		setP(30);
		setC(10);
		setF(60);
	}, []);

	return (
		<div className="home">
			<ProgressBar p={p} c={c} f={f} bar={60}/>
			home

			<Route path={`${match.url}/:date`} component={HomeContent} />
		</div>
	);
};

export default HomePage;
