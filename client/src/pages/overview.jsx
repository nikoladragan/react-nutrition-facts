import React, { useEffect, useState} from 'react';

const OverviewPage = () => {
	const [data, setData] = useState(false);

	useEffect(() => {
		const ls = JSON.parse(localStorage.getItem('food'));

		setData(ls);
	}, []);
	return (
		<div>
			<h1 className="title">Overview</h1>
			{data && <ul>
				{data.map((d, index) => {
					return <li key={d.id}>{index + 1}) {d.name} - {d.calories}kcal</li>;
				})}
			</ul>}
		</div>
	);
};

export default OverviewPage;
