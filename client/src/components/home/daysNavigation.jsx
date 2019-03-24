
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as IconLeftArrow } from './../../assets/icons/left-arrow.svg';
import { ReactComponent as IconRightArrow } from './../../assets/icons/right-arrow.svg';
import { getTodayDate } from '../../helpers/helpers';
import { PropTypes } from 'prop-types';

const DaysNavigation = ({ match, history, setDate }) => {
	const today = new Date().getTime();
	const p = match.params.date;
	const date = new Date(p);
	const dateTime = date.getTime();

	const getDay = (direction) => {
		let gDate = date.getTime() + (direction === 'prev' ? -1 : 1) * 1000 * 60 * 60 * 24;
		gDate = new Date(gDate);

		const gDateTime = gDate.getTime();
		const day = gDate.getDate();
		const month = gDate.getMonth() + 1;
		const year = gDate.getFullYear();

		return today >= gDateTime ? `${year}-${month}-${day}` : false;
	};

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const getFormattedDate = () => `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;

	dateTime > today && history.push(getTodayDate());

	useEffect(() => setDate(dateTime), [ dateTime, match.params.date, setDate ]);

	return (
		<div className="navigation">
			<NavLink to={`/home/${getDay('prev')}`} className="navigation__link">
				<IconLeftArrow className="navigation__icon" />
			</NavLink>

			{getFormattedDate()}

			{getDay('next') ?
				<NavLink to={`/home/${getDay('next')}`} className="navigation__link">
					<IconRightArrow className="navigation__icon" />
				</NavLink> :
				<span className="navigation__link navigation__link--disabled">
					<IconRightArrow className="navigation__icon" />
				</span>
			}
		</div>
	);
};

DaysNavigation.propTypes = {
	setDate: PropTypes.func
};

export default DaysNavigation;
