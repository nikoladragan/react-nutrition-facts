import React, {useState, useEffect} from 'react';
import ProgressBar from '../components/progressBar';

const HomePage = () => {
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
		</div>
	);
};

export default HomePage;
