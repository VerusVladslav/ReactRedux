import * as types from './types';
import isEmpty from 'lodash/isEmpty';
import { NULL } from 'node-sass';
const intialState = {
    user: {
        id: '',
        name: '',
        roles: [],
        image: ''
    },
    loading: false,
    errors: {},
    isAuthenticated: false
}


export const loginReducer = (state = intialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.LOGIN_STARTED:
            return {
                ...state,
                loading: true,
                errors: {}
            }
            break;
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {}
            }
            break;
        case types.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            }
            break;
            case types.LOGIN_SET_CURRENT_USER:
                return {
                    ...state,//spred operator 
                    user:action.user,
                    isAuthenticated: !isEmpty(action.user)
                }
               
        default:
            break;
    }
    return state;
}