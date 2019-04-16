import axios from 'axios';


export function loginCheck(host, token){
	return axios.get(`${host}/api/auth/check`, {  headers:{"x-access-token": token} });
}

export function onLogin(host, id, password){
	return axios.post(`${host}/api/auth/login`, {id, password});
}

export function signUp(host, id, password){
	return axios.post(`${this.props.host}/api/users`, {id, password});
}