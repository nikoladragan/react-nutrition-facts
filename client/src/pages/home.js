import React, { useEffect, useState, useContext } from 'react';
import ProgressBar from '../components/progressBar';
import { Route } from 'react-router-dom';
import DaysNavigation from '../components/daysNavigation';
import { getTodayDate } from '../helpers/helpers';
import HomeContent from '../components/homeContent';
import { getDay } from '../services/daysService';
import { UserDataContext } from '../context/userDataContext';

const HomePage = ({match, history}) => {
	const [day, setDay] = useState(null);
	const [date, setDate] = useState('');
	const { userState } = useContext(UserDataContext);

	useEffect(() => {
		match.path === history.location.pathname && history.push(`/home/${getTodayDate()}`);

		userState.id && date && getDay(date, userState.id)
			.then(res => {
				console.log('results for this day', res);
				setDay(res);
			})
			.catch(err => {
				console.log('err', err);
				setDay(null);
			});
	}, [date, userState]);

	const updateDate = (urlDate) => {
		setDate(urlDate);
	};

	let max = 100;
	const p = Math.floor(Math.random() * max + 1);
	max -= p;
	const c = Math.floor(Math.random() * max + 1);
	max -= c;
	const f = max;

	return (
		<div className="home">
			<ProgressBar p={p} c={c} f={f} bar={Math.floor(Math.random() * (100 - 30 + 1) + 30)}/>
			<Route
				path={`${match.url}/:date`}
				render={props => <DaysNavigation {...props} setDate={updateDate}/>} />
			{day && <HomeContent content={day} />}
			{!day && <p>No content for this day</p>}
		</div>
	);
};

export default HomePage;
