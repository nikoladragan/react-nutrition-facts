import React, { useEffect, useState, useContext } from 'react';
import Heading from '../components/layout/heading';
import { UserDataContext } from '../context/userDataContext';
import { getFilledDays } from '../services/daysService';
import { isEmpty } from '../helpers/helpers';

const OverviewPage = () => {
	const { state: userState } = useContext(UserDataContext);
	const [ data, setData ] = useState([]);

	useEffect(() => {
		!isEmpty(userState) && !data.length && getFilledDays(userState.id)
			.then(res => {
				console.log(res);
				setData(res);
			})
			.catch(err => {
				console.log('err', err);
			});
	}, [ data, userState ]);

	return (
		<div>
			<Heading level={1}>Overview</Heading>
			{data.map(d => {
				return <div key={d.dateId}>{d.dateId}</div>;
			})}
		</div>
	);
};

export default OverviewPage;
