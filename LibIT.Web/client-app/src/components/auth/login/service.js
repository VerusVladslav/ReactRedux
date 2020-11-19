import axios from 'axios';
import { serverUrl } from '../../../config';

export default class LoginService {
    static loginUser(model) {
        return axios.post(`${serverUrl}api/Account/login`, model);
    }
}
