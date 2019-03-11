import React, { useContext } from 'react';
import Input from '../components/input';
import { UserDataContext } from '../context/userDataContext';
import Select from '../components/select';

const ProfilePage = () => {
	const { state, dispatch } = useContext(UserDataContext);

	const getBMR = () => {
		const stateGoal = parseInt(state.goal);
		let goal;

		stateGoal === 1 ? goal = -20 : stateGoal === 3 ? goal = 20 : goal = 0;

		const result = Math.round(state.gender === 'male' ? getMaleBMR() : getFemaleBMR());

		return result + result * goal / 100;
	};

	const getMaleBMR = () => {
		return (88.362 + 13.397 * parseInt(state.weight) + 4.799 * parseInt(state.height) - 5.677 * parseInt(state.age)) * getActivityFactor();
	};

	const getFemaleBMR = () => {
		return (447.593 + 9.247 * parseInt(state.weight) + 3.098 * parseInt(state.height) - 4.330 * parseInt(state.age)) * getActivityFactor();
	};

	const getActivityFactor = () => {
		switch(parseInt(state.activity)) {
			case 1:
				return 1.2;
			case 2:
				return 1.375;
			case 3:
				return 1.55;
			case 4:
				return 1.7;
			case 5:
				return 1.9;
			default:
				return 1;
		}
	};

	return (
		<div>
			<div className="form">
				<div className="form__row">
					<Input
						label="Age"
						type="number"
						placeholder="Age"
						name="age"
						value={state.age}
						// callback={(e) => state.updateProperty('age', e.target.value)} />
						callback={(e) => dispatch({
							type: 'update',
							property: 'age',
							data: e.target.value
						})} />
				</div>
				<div className="form__row">
					<Input
						label="Height"
						type="number"
						placeholder="Height"
						name="height"
						value={state.height}
						callback={(e) => dispatch({
							type: 'update',
							property: 'height',
							data: e.target.value
						})} />
				</div>
				<div className="form__row">
					<Input
						label="Weight"
						type="number"
						placeholder="Weight"
						name="weight"
						value={state.weight}
						callback={(e) => dispatch({
							type: 'update',
							property: 'weight',
							data: e.target.value
						})} />
				</div>
				<div className="form__row">
					<Select
						label="Gender"
						name="gender"
						value={state.gender}
						data={[{text: 'Male', value:'male'}, {text: 'Female', value:'female'}]}
						callback={(e) => dispatch({
							type: 'update',
							property: 'gender',
							data: e.target.value
						})} />
				</div>
				<div className="form__row">
					<Select
						label="Activity level"
						name="activity"
						value={state.activity}
						data={[
							{
								text: 'Sedentary',
								value: 1
							},
							{
								text: 'Mild activity level',
								value: 2
							},
							{
								text: 'Moderate activity level',
								value: 3
							},
							{
								text: 'Heavy or (Labor-intensive) activity level',
								value: 4
							},
							{
								text: 'Extreme level',
								value: 5
							}
						]}
						callback={(e) => dispatch({
							type: 'update',
							property: 'activity',
							data: e.target.value
						})} />
				</div>
				<div className="form__row">
					<Select
						label="Goal"
						name="goal"
						value={state.goal}
						data={[
							{
								text: 'Lose weight',
								value: 1
							},
							{
								text: 'Keep weight',
								value: 2
							},
							{
								text: 'Gain weight',
								value: 3
							}
						]}
						callback={(e) => dispatch({
							type: 'update',
							property: 'goal',
							data: e.target.value
						})} />
				</div>
				<button
					className="form__submit"
					type="button"
					onClick={() => dispatch({
						type: 'update',
						property: 'calories',
						data: getBMR()}
					)}>Save</button>
			</div>

			Age {state.age}<br />
			Gender {state.gender}<br />
			Height {state.height}<br />
			Weight {state.weight}<br />
			Activity {state.activity}<br />
			Goal {state.goal}<br />
			<hr />
			{state.calories ? `calories: ${state.calories}` : null}
		</div>
	);
};

export default ProfilePage;
