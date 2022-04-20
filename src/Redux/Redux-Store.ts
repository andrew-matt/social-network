import {combineReducers, createStore, Store} from "redux";
import profileReducer, {AddPostActionCreator, UpdateNewPostTextActionCreator} from "./Profile-reducer";
import dialogsReducer, {sendMessageCreator, UpdateNewMessageActionCreator} from "./Dialogs-reducer";

export type ActionTypes =
    ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof UpdateNewMessageActionCreator>

export type ReduxStoreType = Store<ReduxStateType, ActionTypes>

export type ReduxStateType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})

let store: ReduxStoreType = createStore(rootReducer)

export default store;