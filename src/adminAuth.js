import axios from 'axios';
import Cookies from 'universal-cookie';
import { refresh } from './routes/Home/api/api';
const cookies = new Cookies();

axios.defaults.withCredentials = true;
class AdminAuth {
	constructor() {
		this.authenticated = false;
	}

	isAuthenticated() {
		const accessToken = cookies.get('adminAuthSession');
		const refreshToken = cookies.get('adminRefreshTokenID');
		if (!accessToken && !refreshToken) {
			return (this.authenticated = false);
		}
		if (accessToken && refreshToken) {
			return (this.authenticated = true);
		}
		if (!accessToken && refreshToken) {
			axios
				.post(refresh, {
					withCredentials: true
				})
				.then(function(res) {
					console.log(res.data);
					
					window.location.reload();
				})
				.catch(function(error) {
					console.log(error.response);
				});
		}
	}
}

export default new AdminAuth();
