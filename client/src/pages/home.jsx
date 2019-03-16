import React, { useEffect, useState, useContext } from 'react';
import ProgressBar from '../components/progressBar';
import { Route } from 'react-router-dom';
import DaysNavigation from '../components/daysNavigation';
import { getTodayDate } from '../helpers/helpers';
import HomeContent from '../components/homeContent';
import { getDay } from '../services/daysService';
import { UserDataContext } from '../context/userDataContext';
import Modal from '../components/modal';
import HomeAddContent from '../components/homeAddContent';

const HomePage = ({match, history}) => {
	const [day, setDay] = useState(null);
	const [date, setDate] = useState('');
	const { userState } = useContext(UserDataContext);
	const [modalVisible, toggleModal] = useState(false);

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

	const toggleContentModal = () => {
		return (
			<Modal closeModal={() => toggleModal(false)}>
				<HomeAddContent />
			</Modal>
		);
	};

	const addDataContent = () => {
		return (
			<div>
				<p>No content added today. Add something?</p>
			</div>
		);
	};

	return (
		<div className="home">
			{day && <ProgressBar p={30} c={30} f={40} bar={60}/>}
			<Route
				path={`${match.url}/:date`}
				render={props => <DaysNavigation {...props} setDate={updateDate}/>} />
			{day && <HomeContent content={day} />}
			{!day && addDataContent()}
			<button onClick={() => toggleModal(!modalVisible)}>Add data</button>
			{modalVisible && toggleContentModal()}
		</div>
	);
};

export default HomePage;
