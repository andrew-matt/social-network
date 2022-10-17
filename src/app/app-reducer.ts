import {AppThunk} from 'app/store'
import {getUserData} from 'app/auth/auth-reducer'

const initialState = {
    initialized: false,
}

export const appReducer = (state: InitialStateType = initialState, {
    type,
    payload,
}: AppReducerActionTypes): InitialStateType => {
    switch (type) {
        case 'app/SET-INITIALIZED-SUCCESS':
            return {
                ...state,
                ...payload,
            }
        default:
            return state
    }
}

//actions
export const setInitializedSuccess = () => ({
    type: 'app/SET-INITIALIZED-SUCCESS',
    payload: {initialized: true},
} as const)

//thunks
export const initializeApp = (): AppThunk => dispatch => {
    let promise = dispatch(getUserData())
    promise.then(() => {
        dispatch(setInitializedSuccess())
    })
}

//types
type InitialStateType = typeof initialState

type SetInitializedSuccessType = ReturnType<typeof setInitializedSuccess>

export type AppReducerActionTypes = SetInitializedSuccessType
