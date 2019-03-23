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
	const [ direction, setDirection ] = useState('');

	useEffect(() => {
		checkHomeUrl();
		detectDirection();

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
				setDay(res);
			})
			.catch(err => {
				console.log('err', err);
				setDay(null);
			});
	}, [ checkDate ]);

	const checkHomeUrl = () => {
		const firstCondition = match.path === history.location.pathname;
		const secondCondition = match.path + '/' === history.location.pathname;
		const condition = firstCondition || secondCondition;

		condition && history.push(`/home/${getTodayDate()}`);
	};

	const calculateCaloriesPercentage = () => {
		if (isEmpty(day) || !userState) return {
			p: 0,
			c: 0,
			f: 0,
			bar: 0
		};

		const neededCalories = userState.calories;
		const { calories, carbs, fat, protein } = day;

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

	const detectDirection = () => {
		const prevDate = (history.test || '').replace('/home/', '');
		const nextDate = history.location.pathname.replace('/home/', '');

		const pTime = new Date(prevDate).getTime();
		const nTime = new Date(nextDate).getTime();

		setDirection(pTime > nTime ? 'left' : nTime > pTime ? 'right' : 'bottom');

		history.test = history.location.pathname;
	};

	const handleCloseModal = () => {
		history.test = history.location.pathname;
		getDay(date, userState.id)
			.then(res => {
				toggleModal(false);
				setDay(res);
			});
	};

	return (
		<div className="home">
			{!isEmpty(userState) && <ProgressBar { ...calculateCaloriesPercentage() }/>}
			{!isEmpty(userState) && <h1 className="title">Hi {userState.name}!</h1>}
			<Route
				path={`${match.url}/:date`}
				render={props => <DaysNavigation {...props} setDate={setDate}/>} />
			{!isEmpty(day) && <HomeContent direction={direction} content={day} date={date}/>}
			{isEmpty(day) && <NoContent />}
			<button className="button-action"onClick={() => toggleModal(!modalVisible)}>
				<span className="sr-only">Add data</span>
				<IconAdd />
			</button>
			{modalVisible && <HomeAddContent checkDate={setCheckDate} date={date} closeModal={handleCloseModal}/>}
		</div>
	);
};

export default HomePage;
