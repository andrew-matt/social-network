import {applyMiddleware, combineReducers, createStore, Store} from 'redux';
import profileReducer, {AddPost, setUserProfile, setStatus, UpdateNewPostText} from './Profile-reducer';
import dialogsReducer, {SendMessageAC, UpdateNewMessageAC} from './Dialogs-reducer';
import usersReducer, {
    followSuccess,
    setCurrentPage,
    toggleIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollowSuccess, toggleFollowingProgress,
} from './Users-reducer';
import authReducer, {setUserData} from './Auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

export type ActionTypes =
    ReturnType<typeof AddPost>
    | ReturnType<typeof UpdateNewPostText>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof SendMessageAC>
    | ReturnType<typeof UpdateNewMessageAC>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setStatus>

export type ReduxStoreType = Store<ReduxStateType, ActionTypes>

export type ReduxStateType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
});

let store: ReduxStoreType = createStore(rootReducer, applyMiddleware(thunkMiddleware));

declare global {
    interface Window {
        store: ReduxStoreType;
    }
}

window.store = store;

export default store;