import axios from 'axios';

const endpoint = 'http://192.168.0.12:3200';
export const USER = '/user';


export const get = (action, payload) => {
	return axios.get(`${endpoint}${action}`, { params: payload });
};

export const post = (action, payload) => {
	return axios.post(`${endpoint}${action}`, payload);
};

export const del = (action, payload) => {
	return axios.delete(`${endpoint}${action}`, { params: { id: payload } });
};

export const update = (action, payload) => {
	return axios.put(`${endpoint}${action}`, payload);
};
