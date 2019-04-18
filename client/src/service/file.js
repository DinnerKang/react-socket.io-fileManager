import axios from 'axios';


export function insertFile(host, formData){
	return axios.post(`${host}/api/file`, formData);
}

export function getTree(host, user){
	return axios.get(`${host}/api/file/${user}`);
}