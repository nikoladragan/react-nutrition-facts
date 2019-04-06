import React, { useContext, useState, useEffect } from 'react';
import Input from '../components/forms/input';
import { UserDataContext } from '../context/userDataContext';
import Select from '../components/forms/select';
import { updateUserData } from '../services/userService';
import { GOAL_DATA, ACTIVITY_DATA, GENDER_DATA } from '../constants';
import { NotificationContext } from '../context/notificationContext';
import { isEmpty } from '../helpers/helpers';
import Heading from '../components/layout/heading';
import FormRow from '../components/forms/form-row';
import FormSubmitButton from '../components/forms/submit';
import Form from '../components/forms/form';

const ProfilePage = () => {
	const { state: userState, dispatch: userDispatch } = useContext(UserDataContext);
	const { dispatch: notificationDispatch } = useContext(NotificationContext);

	const [ name, setName ] = useState();

	const [ age, setAge ] = useState();
	const [ weight, setWeight ] = useState();
	const [ height, setHeight ] = useState();

	const [ gender, setGender ] = useState();
	const [ activity, setActivity ] = useState();
	const [ goal, setGoal ] = useState();

	useEffect(() => {
		setName(userState.name);
		setAge(userState.age);
		setWeight(userState.weight);
		setHeight(userState.height);

	}, [ userState ]);

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
		switch (parseInt(d.activity)) {
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

		if (isFormValid(data)) {
			updateUserData(data)
				.then(res => {
					notificationDispatch({
						type: 'addNewNotification',
						data: {
							name: 'Profile saved',
							type: 'good'
						}
					});

					userDispatch({
						type: 'setInitialData',
						data: res
					});
				});
		} else {
			notificationDispatch({
				type: 'addNewNotification',
				data: {
					name: 'Please fill all the fields',
					type: 'bad'
				}
			});
		}
	};

	const isFormValid = data => {
		let arrayGood = true;
		const array = Object.keys(data).filter(d => d !== 'profileSetUp' && d !== 'id');

		for (let i = 0; i < array.length; i++) {
			const v = data[array[i]];
			if (isEmpty(v)) {
				arrayGood = false;
				break;
			}
		}

		return arrayGood;
	};

	return (
		<>
			<Heading level={2}>Profile</Heading>
			<Form>
				<FormRow>
					<Input
						label="Name"
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						callback={(e) => setName(e.target.value)} />
				</FormRow>
				<FormRow>
					<Input
						label="Age"
						type="number"
						placeholder="Age"
						name="age"
						value={age}
						callback={(e) => setAge(e.target.value)} />
				</FormRow>
				<FormRow>
					<Input
						label="Height"
						type="number"
						placeholder="Height"
						name="height"
						value={height}
						defaultValue={userState.height}
						callback={(e) => setHeight(e.target.value)} />
				</FormRow>
				<FormRow>
					<Input
						label="Weight"
						type="number"
						placeholder="Weight"
						name="weight"
						value={weight}
						defaultValue={userState.weight}
						callback={(e) => setWeight(e.target.value)} />
				</FormRow>
				<FormRow>
					<Select
						label="Gender"
						name="gender"
						value={userState.gender || GENDER_DATA[0].value}
						data={GENDER_DATA}
						callback={(e) => setGender(e.target.value)} />
				</FormRow>
				<FormRow>
					<Select
						label="Activity level"
						name="activity"
						value={userState.activity || ACTIVITY_DATA[0].value}
						data={ACTIVITY_DATA}
						callback={(e) => setActivity(e.target.value)} />
				</FormRow>
				<FormRow>
					<Select
						label="Goal"
						name="goal"
						value={userState.goal || GOAL_DATA[0].value}
						data={GOAL_DATA}
						callback={(e) => setGoal(e.target.value)} />
				</FormRow>
				<FormSubmitButton
					callback={saveUserData}
					text="Save profile"/>
			</Form>
			<hr />
			{userState.calories ? `calories: ${userState.calories}` : null}
		</>
	);
};

export default ProfilePage;
