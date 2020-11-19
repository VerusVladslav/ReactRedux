import * as types from './types';
import LoginService from './service';
import { push } from 'connected-react-router';
import jwt from 'jsonwebtoken';
import setAuthorizationToken  from '../../../Utils/setAuthorization';

export const loginUser = (model) => {
    return (dispatch) => {
        dispatch({type: types.LOGIN_STARTED});
        LoginService.loginUser(model)
            .then((response)=>{
                dispatch({type: types.LOGIN_SUCCESS});
                dispatch(push('/'));
                loginByJWT(response.data,dispatch);
                // const token = response.data.token;
                // localStorage.setItem("token", token);
                // const decoded = jwt_decode(token);
                // const name = decoded.name;
                // console.log("NAME IN LOGIN", name);
                // dispatch({ type: types.LOGIN_USER, payload: name });
                // dispatch({ type: types.LOGIN_TOKEN, payload: token });
                // dispatch({ type: types.LOGIN_SUCCESS });
                // dispatch(push('/'));
               
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.LOGIN_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err=> {
                console.log("Global server error", err);
            }
        );

    }
}

export const loginByJWT = (tokens,dispatch) => {
    const {token} = tokens; //property from object = tokens.token
    var user = jwt.decode(token);
    if(!Array.isArray(user.roles)) {
        user.roles = Array.of(user.roles);
    }
    localStorage.setItem('authToken', token);
    setAuthorizationToken(token);
    dispatch({
        type:types.LOGIN_SET_CURRENT_USER,
        user
    });
    // console.log(tokens);
    console.log("--User login -- ", user);
}

export const logOutByJWT = (token) => {
    // const {token} = tokens; //property from object = tokens.token
    
     setAuthorizationToken(token);
    localStorage.removeItem('authToken');
   // const dispatch =({ type: types.LOGIN_SET_CURRENT_USER });
    
   // console.log("--User login -- ", user);
}