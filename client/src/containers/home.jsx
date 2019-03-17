import React, { useEffect, useState, useContext } from 'react';
import { Route } from 'react-router-dom';
import { getTodayDate, isEmpty } from '../helpers/helpers';
import { getDay } from '../services/daysService';
import { UserDataContext } from '../context/userDataContext';

import ProgressBar from '../components/home/progressBar';
import DaysNavigation from '../components/home/daysNavigation';
import HomeContent from '../components/home/content';
import HomeAddContent from '../components/home/popupContent';
import NoContent from '../components/home/noContent';

import { ReactComponent as IconAdd } from '../assets/icons/add.svg';

const HomePage = ({ match, history }) => {
	const [ day, setDay ] = useState(null);
	const [ date, setDate ] = useState('');
	const { userState } = useContext(UserDataContext);
	const [ modalVisible, toggleModal ] = useState(false);
	const [ checkDate, setCheckDate ] = useState(false);

	useEffect(() => {
		checkHomeUrl();

		userState.id && date && getDay(date, userState.id)
			.then(res => {
				setDay(res);
			})
			.catch(err => {
				console.log('err', err);
				setDay(null);
			});
	}, [ date, userState ]);

	useEffect(() => {
		checkDate && getDay(date, userState.id)
			.then(res => {
				console.log('ovo?', res);
				setDay(res);
			})
			.catch(err => {
				console.log('err', err);
				setDay(null);
			});
	}, [ checkDate ]);

	useEffect(() => {
		// setTimeout(() => {
		// 	calculateCaloriesPercentage();
		// }, 1000);
	}, [ day ]);

	const updateDate = (urlDate) => {
		setDate(urlDate);
	};

	const checkHomeUrl = () => {
		const firstCondition = match.path === history.location.pathname;
		const secondCondition = match.path + '/' === history.location.pathname;
		const condition = firstCondition || secondCondition;

		condition && history.push(`/home/${getTodayDate()}`);
	};

	const calculateCaloriesPercentage = () => {
		const neededCalories = userState.calories;
		const { calories, carbs, fat, protein } = day;

		// const p =
		const sum = carbs + fat + protein;

		const bar = calories * 100 / neededCalories;
		const p = protein * 100 / sum;
		const c = carbs * 100 / sum;
		const f = fat * 100 / sum;

		return {
			p: p,
			c: c,
			f: f,
			bar: bar
		};
	};

	return (
		<div className="home">
			{
				!isEmpty(day) && <>
					<ProgressBar { ...calculateCaloriesPercentage() }/>
					<div className="home__progress-gap"></div>
				</>
			}
			{!isEmpty(userState) && <h1 className="title">Hi {userState.name}!</h1>}
			<Route
				path={`${match.url}/:date`}
				render={props => <DaysNavigation {...props} setDate={updateDate}/>} />
			{!isEmpty(day) && <HomeContent content={day}/>}
			{isEmpty(day) && <NoContent />}
			<button className="button-action"onClick={() => toggleModal(!modalVisible)}>
				<span className="sr-only">Add data</span>
				<IconAdd />
			</button>
			{modalVisible && <HomeAddContent checkDate={setCheckDate} date={date} closeModal={() => toggleModal(false)}/>}
		</div>
	);
};

export default HomePage;
