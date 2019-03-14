import React, { useContext, useState } from 'react';
import Input from '../components/input';
import { UserDataContext } from '../context/userDataContext';
import Select from '../components/select';
import { updateUserData } from '../services/userService';

const GENDER_DATA = [
	{
		text: 'Male',
		value:'male'
	},
	{
		text: 'Female',
		value:'female'
	}
];
const ACTIVITY_DATA = [
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
];
const GOAL_DATA = [
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
];

const ProfilePage = () => {
	const { userState, userDispatch } = useContext(UserDataContext);

	const [ name, setName ] = useState();

	const [ age, setAge ] = useState();
	const [ weight, setWeight ] = useState();
	const [ height, setHeight ] = useState();

	const [ gender, setGender ] = useState();
	const [ activity, setActivity ] = useState();
	const [ goal, setGoal ] = useState();

	const getBMR = (d) => {
		const stateGoal = parseInt(d.goal);
		let goalP;

		stateGoal === 1 ? goalP = -20 : stateGoal === 3 ? goalP = 20 : goalP = 0;

		const result = Math.round(d.gender === 'male' ? getMaleBMR(d) : getFemaleBMR(d));

		return result + result * goalP / 100;
	};

	const getMaleBMR = (d) => {
		return (88.362 + 13.397 * parseInt(d.weight) + 4.799 * parseInt(d.height) - 5.677 * parseInt(d.age)) * getActivityFactor(d);
	};

	const getFemaleBMR = (d) => {
		return (447.593 + 9.247 * parseInt(d.weight) + 3.098 * parseInt(d.height) - 4.330 * parseInt(d.age)) * getActivityFactor(d);
	};

	const getActivityFactor = (d) => {
		switch(parseInt(d.activity)) {
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

	const saveUserData = () => {
		const data = {
			...userState,
			name: name || userState.name,
			age: age || userState.age,
			height: height || userState.height,
			weight: weight || userState.weight,
			gender: gender || userState.gender,
			activity: activity || userState.activity,
			goal: goal || userState.goal,
		};

		data.calories = getBMR(data);

		updateUserData(data)
			.then(res => {
				console.log(res);
				userDispatch({
					type: 'setInitialData',
					data: res
				});
			});
	};

	if(!userState.activity) return '';

	return (
		<div>
			<div className="form">
				<div className="form__row">
					<Input
						label="Name"
						type="text"
						placeholder="Name"
						name="name"
						value={userState.name}
						callback={(e) => setName(e.target.value)} />
				</div>
				<div className="form__row">
					<Input
						label="Age"
						type="number"
						placeholder="Age"
						name="age"
						value={userState.age}
						callback={(e) => setAge(e.target.value)} />
				</div>
				<div className="form__row">
					<Input
						label="Height"
						type="number"
						placeholder="Height"
						name="height"
						value={userState.height}
						callback={(e) => setHeight(e.target.value)} />
				</div>
				<div className="form__row">
					<Input
						label="Weight"
						type="number"
						placeholder="Weight"
						name="weight"
						value={userState.weight}
						callback={(e) => setWeight(e.target.value)} />
				</div>
				<div className="form__row">
					<Select
						label="Gender"
						name="gender"
						value={userState.gender}
						data={GENDER_DATA}
						callback={(e) => setGender(e.target.value)} />
				</div>
				<div className="form__row">
					<Select
						label="Activity level"
						name="activity"
						value={userState.activity}
						data={ACTIVITY_DATA}
						callback={(e) => setActivity(e.target.value)} />
				</div>
				<div className="form__row">
					<Select
						label="Goal"
						name="goal"
						value={userState.goal}
						data={GOAL_DATA}
						callback={(e) => setGoal(e.target.value)} />
				</div>
				<button
					className="form__submit"
					type="button"
					onClick={saveUserData}>Save</button>
			</div>
			<hr />
			{userState.calories ? `calories: ${userState.calories}` : null}
		</div>
	);
};

export default ProfilePage;
