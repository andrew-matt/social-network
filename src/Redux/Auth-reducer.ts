import {ActionTypes} from './Redux-Store';
import {Dispatch} from 'redux';
import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

export type AuthType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const SET_USER_DATA = 'SET_USER_DATA';

const initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action: ActionTypes): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const setUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth},
} as const);

export const getUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setUserData(id, email, login, true));
            }
        });
};

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getUserData() as any);
            } else {
                const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error: message}));
            }
        });
};

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false));
            }
        });
};

export default authReducer;