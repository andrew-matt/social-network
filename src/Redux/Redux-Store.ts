import {combineReducers, createStore, Store} from "redux";
import profileReducer, {AddPostActionCreator, UpdateNewPostTextActionCreator} from "./Profile-reducer";
import dialogsReducer, {SendMessageAC, UpdateNewMessageAC} from "./Dialogs-reducer";
import usersReducer, {FollowAC, SetUsersAC, UnfollowAC} from "./Users-reducer";

export type ActionTypes =
    ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>
    | ReturnType<typeof SendMessageAC>
    | ReturnType<typeof UpdateNewMessageAC>
    | ReturnType<typeof FollowAC>
    | ReturnType<typeof UnfollowAC>
    | ReturnType<typeof SetUsersAC>

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