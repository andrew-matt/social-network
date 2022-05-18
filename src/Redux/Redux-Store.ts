import {combineReducers, createStore, Store} from "redux";
import profileReducer, {AddPostActionCreator, UpdateNewPostTextActionCreator} from "./Profile-reducer";
import dialogsReducer, {SendMessageAC, UpdateNewMessageAC} from "./Dialogs-reducer";
import usersReducer, {
    followAC,
    setCurrentPageAC,
    toggleIsFetchingAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC
} from "./Users-reducer";

export type ActionTypes =
    ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>
    | ReturnType<typeof SendMessageAC>
    | ReturnType<typeof UpdateNewMessageAC>
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>

export type ReduxStoreType = Store<ReduxStateType, ActionTypes>

export type ReduxStateType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
})

let store: ReduxStoreType = createStore(rootReducer)

declare global {
    interface Window {
        store: ReduxStoreType
    }
}

window.store = store

export default store;