import { generateId, getLocalStorage } from '../helpers/helpers';

// export const login = data => Api.post(Api.USER + '/login', data);
// export const register = data => Api.post(Api.USER + '/register', data);
// export const validate = data => Api.post(Api.USER + '/validate', data);
// export const logout = data => Api.post(Api.USER + '/logout', data);

// export const updateUserData = data => Api.update(Api.USER + '/update', data);


export const login = data => new Promise((resolve, reject) => {
	const { username, password } = data;
	const users = getLocalStorage('users');
	const result = users.filter(u => u.username === username && u.password === password);

	if (result.length > 0) {
		const res = result[0];
		const token = generateId(24);

		const userSession = getLocalStorage('userSession');
		const data = {
			token,
			user: {
				username,
				isAdmin: res.isAdmin,
				_id: res._id,
				data: res.data
			}
		};

		userSession.push({
			isDeleted: false,
			userId: res._id,
			_id: token
		});

		localStorage.setItem('userSession', JSON.stringify(userSession));

		resolve(data);
	} else {
		reject('bad info');
	}
});

export const validate = data => new Promise(resolve => {
	const userSession = getLocalStorage('userSession');
	const result = userSession.filter(s => !s.isDeleted && s._id === data.token);

	if (result.length) {
		const res = result[0];
		const id = res.userId;
		const users = getLocalStorage('users');
		const user = users.filter(u => u._id === id)[0];

		if (user) {
			const userData = {
				username: user.username,
				isAdmin: user.isAdmin,
				data: user.data
			};

			userData.data.id = user._id;

			const data = {
				token: res._id,
				user: userData
			};

			resolve(data);
		} else {
			resolve('something went wrong');
		}

	} else {
		resolve('bad verification');
	}
});

export const logout = data => new Promise((resolve, reject) => {
	const userSession = getLocalStorage('userSession');
	const result = userSession.filter(u => u._id === data.token)[0];

	if (result) {
		const leftover = userSession.filter(u => u._id !== data.token);

		localStorage.setItem('userSession', JSON.stringify(leftover));

		resolve(true);
	} else {
		reject('bad');
	}

	console.log(data, userSession);
});

export const register = data => new Promise((resolve, reject) => {
	const { username, password } = data;
	const users = getLocalStorage('users');

	const result = users.filter(u => username === u.username);
	if (username.length < 3) {
		reject('username too short');
	} else if (password.length < 3) {
		reject('password too short');
	} else if (result.length) {
		reject('username taken');
	} else {
		const newUser = {
			_id: generateId(24),
			username,
			password,
			isAdmin: false,
			banned: false,
			activated: true,
			data: {
				profileSetUp: false,
				activity: 1
			}
		};

		users.push(newUser);
		localStorage.setItem('users', JSON.stringify(users));

		resolve('Registration successful');
	}
});

export const updateUserData = data => new Promise((resolve, reject) => {
	const users = getLocalStorage('users');
	const result = users.filter(u => u._id === data.id)[0];

	const leftover = users.filter(u => u._id !== data.id);

	if (result) {
		result.data = data;
		leftover.push(result);
		localStorage.setItem('users', JSON.stringify(users));

		resolve(data);
	} else {
		reject('something went wrong');
	}
});
