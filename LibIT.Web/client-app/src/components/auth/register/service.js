import axios from 'axios';
import { serverUrl } from '../../../config';

export default class RegisterService {
    static registerUser(model) {
        return axios.post(`${serverUrl}api/Account/register`, model);
    }
}
