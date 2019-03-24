import React, { useEffect, useState } from 'react';
import Heading from '../components/layout/heading';

const OverviewPage = () => {
	const [ data, setData ] = useState(false);

	useEffect(() => {
		const ls = JSON.parse(localStorage.getItem('food'));

		setData(ls);
	}, []);
	return (
		<div>
			<Heading level={1}>Overview</Heading>
			{data && <ul>
				{data.map((d, index) => {
					return <li key={d.id}>{index + 1}) {d.name} - {d.calories}kcal</li>;
				})}
			</ul>}
		</div>
	);
};

export default OverviewPage;
