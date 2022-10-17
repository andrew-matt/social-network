import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {
    dialogsReducer,
    DialogsReducerActionTypes,
} from 'components/Dialogs/dialogs-reducer'
import {usersReducer, UsersReducerActionTypes} from 'components/Users/users-reducer'
import {authReducer, AuthReducerActionTypes} from 'app/auth/auth-reducer'
import {reducer as formReducer} from 'redux-form'
import {appReducer, AppReducerActionTypes} from 'app/app-reducer'
import thunk, {ThunkAction} from 'redux-thunk'
import {
    profileReducer,
    ProfileReducerActionTypes,
} from 'components/Profile/profile-reducer'
import {FormAction} from 'redux-form/lib/actions'

let rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    dialogsPage: dialogsReducer,
    form: formReducer,
})
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

//types
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionTypes = AppReducerActionTypes
    | AuthReducerActionTypes
    | ProfileReducerActionTypes
    | UsersReducerActionTypes
    | DialogsReducerActionTypes
    | FormAction

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionTypes>

// @ts-ignore
window.store = store


