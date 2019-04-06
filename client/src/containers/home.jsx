import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { Route } from 'react-router-dom';
import { getTodayDate, isEmpty } from '../helpers/helpers';
import { getDay } from '../services/daysService';
import { UserDataContext } from '../context/userDataContext';

import ProgressBar from '../components/home/progressBar';
import DaysNavigation from '../components/home/daysNavigation';
import HomeContent from '../components/home/content';
import HomeAddContent from '../components/home/popupContent';
import NoContent from '../components/home/noContent';

import Warning from '../components/shared/warning';
import Heading from '../components/layout/heading';
import AddDataButton from '../components/home/add-data-button';

const HomePage = ({ match, history }) => {
	const [ day, setDay ] = useState({});
	const [ date, setDate ] = useState('');
	const { state: userState } = useContext(UserDataContext);
	const [ modalVisible, toggleModal ] = useState(false);
	const [ checkDate, setCheckDate ] = useState(false);
	const [ direction, setDirection ] = useState('');
	const prevDate = useRef('');

	let tooMuchCalories = false;

	const checkHomeUrl = useCallback(() => {
		const firstCondition = match.path === history.location.pathname;
		const secondCondition = match.path + '/' === history.location.pathname;
		const condition = firstCondition || secondCondition;

		condition && history.push(`/home/${getTodayDate()}`);
	}, [ history, match.path ]);

	const calculateCaloriesPercentage = () => {
		if (isEmpty(day) || !userState) return {
			p: 0,
			c: 0,
			f: 0,
			bar: 0
		};

		const { calories, carbs, fat, protein } = day;

		const sum = carbs + fat + protein;

		const bar = calories * 100 / day.maxCalories;
		const p = protein * 100 / sum;
		const c = carbs * 100 / sum;
		const f = fat * 100 / sum;

		if (bar > 100) {
			tooMuchCalories = true;
			return {
				bar: 100,
				overMaximum: true
			};
		}

		return {
			p: p,
			c: c,
			f: f,
			bar: bar
		};
	};

	const detectDirection = useCallback(() => {
		const nextDate = history.location.pathname.replace('/home/', '');

		const pTime = new Date(prevDate.current).getTime();
		const nTime = new Date(nextDate).getTime();

		setDirection(pTime > nTime ? 'left' : nTime > pTime ? 'right' : 'bottom');

		prevDate.current = history.location.pathname;
	}, [ history.location.pathname ]);

	const handleCloseModal = () => {
		history.test = history.location.pathname;
		getDay(date, userState.id)
			.then(res => {
				toggleModal(false);
				setDay(res);
			});
	};

	useEffect(() => {
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
		checkHomeUrl();
		detectDirection();
	}, [ checkHomeUrl, detectDirection ]);

	useEffect(() => {
		checkDate && getDay(date, userState.id)
			.then(res => {
				setDay(res);
			})
			.catch(err => {
				console.log('err', err);
				setDay(null);
			});
	}, [ checkDate, date, userState.id ]);

	return (
		<div className="home">
			<ProgressBar { ...calculateCaloriesPercentage() } show={!isEmpty(day.meals)}/>
			{!isEmpty(userState) && <Heading level={1} modifiers="small">Hi {userState.name}!</Heading>}
			<Route path={`${match.url}/:date`}
				render={props => <DaysNavigation {...props} setDate={setDate}/>} />
			{tooMuchCalories && <Warning />}
			{day.meals && <HomeContent direction={direction} content={day} date={date} setDay={setDay}/>}
			{isEmpty(day.meals) && <NoContent />}
			<AddDataButton callback={toggleModal} modalVisible={modalVisible} />
			{modalVisible && <HomeAddContent checkDate={setCheckDate} date={date} closeModal={handleCloseModal}/>}
		</div>
	);
};

export default HomePage;
