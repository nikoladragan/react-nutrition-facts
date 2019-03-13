import React, {useEffect} from 'react';
import ProgressBar from '../components/progressBar';
import { Route } from 'react-router-dom';
import HomeContent from '../context/homeContent';
import { getTodayDate } from '../helpers/helpers';

const HomePage = ({match, history}) => {
	// const [p, setP] = useState(0);
	// const [c, setC] = useState(0);
	// const [f, setF] = useState(0);

	// useEffect(() => {
	// 	setP(30);
	// 	setC(10);
	// 	setF(60);
	// }, []);

	useEffect(() => {
		console.log('pathname updated');
		match.path === history.location.pathname && history.push(`/home/${getTodayDate()}`);
	}, [history.location.pathname]);

	let max = 100;
	const p = Math.floor(Math.random() * max + 1);

	max -= p;

	const c = Math.floor(Math.random() * max + 1);

	max -= c;

	const f = max;

	console.log(p, c, f);

	// console.log(match, history);
	// !match.params.date && history.push('9999-12-31');

	return (
		<div className="home">
			<ProgressBar p={p} c={c} f={f} bar={Math.floor(Math.random() * (100 - 30 + 1) + 30)}/>
			<Route path={`${match.url}/:date`} component={HomeContent} />
		</div>
	);
};

export default HomePage;
