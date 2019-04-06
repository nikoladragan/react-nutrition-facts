import React, { useEffect, useState, useContext } from 'react';
import Heading from '../components/layout/heading';
import { UserDataContext } from '../context/userDataContext';
import { getFilledDays } from '../services/daysService';
import { isEmpty, getFormattedDate } from '../helpers/helpers';

const OverviewPage = () => {
	const { state: userState } = useContext(UserDataContext);
	const [ data, setData ] = useState([]);

	useEffect(() => {
		!isEmpty(userState) && !data.length && getFilledDays(userState.id)
			.then(res => {
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
				return <div className="card card--show" key={d.dateId}>
					<div className="card__item">
						<Heading level={2} modifiers={'small'}>{getFormattedDate(d.dateId)}</Heading>
					</div>
					{d.meals.map(m => {
						return <div key={m.id} className="card__item">
							<Heading level={3} modifiers="small">{m.mealType}</Heading>
							<ul>
								{m.content.map(c => {
									return <li key={c.id}>{c.name}</li>;
								})}
							</ul>
						</div>;
					})}
				</div>;
			})}
		</div>
	);
};

export default OverviewPage;
