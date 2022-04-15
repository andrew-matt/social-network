import {combineReducers, createStore, Store} from "redux";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import {ActionTypes} from "./Store";

export type ReduxStoreType = Store<ReduxStateType, ActionTypes>

type RootState = typeof rootReducers

type ReduxStateType = ReturnType<RootState>

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})

let store: ReduxStoreType = createStore(rootReducers)

export default store;