import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer, {AddPost, setStatus, setUserProfile} from './Profile-reducer';
import dialogsReducer, {SendMessageAC} from './Dialogs-reducer';
import usersReducer, {
    fake,
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
    toggleIsFetching,
    unfollowSuccess,
} from './Users-reducer';
import authReducer, {setUserData} from './Auth-reducer';
import {reducer as formReducer} from 'redux-form';
import appReducer, {initializedSuccess} from './App-reducer';
import thunk, {ThunkAction} from 'redux-thunk';

export type FollowSuccessType = ReturnType<typeof followSuccess>
export type UnFollowSuccessType = ReturnType<typeof unfollowSuccess>

export type ActionTypes = ReturnType<typeof AddPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof SendMessageAC>
    | FollowSuccessType
    | UnFollowSuccessType
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof initializedSuccess>
    | ReturnType<typeof fake>

export type ReduxStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxStateType, unknown, ActionTypes>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

export default store;