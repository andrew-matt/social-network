import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer, {AddPost, setStatus, setUserProfile} from './Profile-reducer';
import dialogsReducer, {SendMessageAC} from './Dialogs-reducer';
import usersReducer, {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
    toggleIsFetching,
    unfollowSuccess,
} from './Users-reducer';
import authReducer, {setUserData} from './Auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

export type ActionTypes = ReturnType<typeof AddPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof SendMessageAC>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setStatus>

export type ReduxStateType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;

export default store;