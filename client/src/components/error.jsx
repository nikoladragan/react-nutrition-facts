import React, { useState, useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { ErrorContext } from '../context/errorContext';

const ErrorComponent = () => {
	const [ errors, setError ] = useState([]);
	const { state: errorState, dispatch: errorDispatch } = useContext(ErrorContext);

	useEffect(() => {
		setError(errorState);
	}, [ setError, errorState ]);

	useEffect(() => {
		const dataToUpdate = errorState.filter(e => e.timerActivated !== true);

		dataToUpdate.map(d => {
			setTimeout(() => {
				errorDispatch({
					type: 'removeError',
					data: d.id
				});
			}, 2000);
		});

		if (dataToUpdate.length) {
			errorDispatch({
				type: 'activateTimer',
				data: dataToUpdate
			});
		}

	}, [ errorDispatch, errorState ]);

	return (
		<div className="errors">
			{errors && errors.map(e => {
				return <div className="card card--show card--warning" key={e.id}>{e.name}</div>;
			})}
		</div>
	);
};

ErrorComponent.propTypes = {
	error: PropTypes.object
};

export default ErrorComponent;
