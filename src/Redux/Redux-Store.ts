import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import profileReducer, {AddPostActionCreator, setUserProfile, UpdateNewPostTextActionCreator} from "./Profile-reducer";
import dialogsReducer, {SendMessageAC, UpdateNewMessageAC} from "./Dialogs-reducer";
import usersReducer, {
    follow,
    setCurrentPage,
    toggleIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow, toggleFollowingProgress
} from "./Users-reducer";
import authReducer, {setUserData} from "./Auth-reducer";
import thunkMiddleware from "redux-thunk";

export type ActionTypes =
    ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof SendMessageAC>
    | ReturnType<typeof UpdateNewMessageAC>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof toggleFollowingProgress>

export type ReduxStoreType = Store<ReduxStateType, ActionTypes>

export type ReduxStateType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

let store: ReduxStoreType = createStore(rootReducer, applyMiddleware(thunkMiddleware))

declare global {
    interface Window {
        store: ReduxStoreType
    }
}

window.store = store

export default store;