import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeContent = ({match}) => {
	console.log(match);
	const p = match.params.date;
	const date = new Date(p);

	const getDay = (prev) => {
		let gDate = date.getTime() + (prev ? -1 : 1) * 1000 * 60 * 60 * 24;
		gDate = new Date(gDate);

		const day = gDate.getDate();
		const month = gDate.getMonth() + 1;
		const year = gDate.getFullYear();

		return `${year}-${month}-${day}`;
	}

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return (
		<div>
			<div><NavLink to={`/home/${getDay(true)}`}>prev</NavLink></div>
			date: {day < 10 ? `0${day}` : day}.{month < 10 ? `0${month}` : month}.{year}.
			<div><NavLink to={`/home/${getDay(false)}`}>next</NavLink></div>

		</div>
	);
};

export default HomeContent;
