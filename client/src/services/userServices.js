import * as Api from './api';

export const login = data => Api.post(Api.USER + '/login', data);
export const register = data => Api.post(Api.USER + '/register', data);
export const validate = data => Api.post(Api.USER + '/validate', data);
export const logout = data => Api.post(Api.USER + '/logout', data);
