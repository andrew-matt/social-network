import {AppThunk} from 'app/store'
import {Dispatch} from 'Redux'
import {authAPI, securityAPI} from 'api/api'
import {stopSubmit} from 'redux-form'
import {setIsLoading} from 'app/app-reducer'

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

export const authReducer = (state: InitialStateType = initialState, {
    type,
    payload,
}: AuthReducerActionTypes): InitialStateType => {
    switch (type) {
        case 'auth/SET-USER-DATA':
        case 'auth/GET-CAPTCHA-URL-SUCCESS':
        case 'auth/CLEAR-CAPTCHA':
            return {...state, ...payload}
        default:
            return state
    }
}

//actions
export const setUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'auth/SET-USER-DATA',
    payload: {userId, email, login, isAuth},
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: 'auth/GET-CAPTCHA-URL-SUCCESS',
    payload: {captchaUrl},
} as const)

export const clearCaptcha = (captchaUrl: null) => ({
    type: 'auth/CLEAR-CAPTCHA',
    payload: {captchaUrl},
} as const)

//thunks
export const getUserData = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            await dispatch(getUserData())
        } else {

            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }

            const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    } finally {
        dispatch(setIsLoading(false))
    }
}

export const getCaptchaUrl = (): AppThunk => async dispatch => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
            dispatch(clearCaptcha(null))
        }
    } finally {
        dispatch(setIsLoading(false))
    }
}

//types
type InitialStateType = typeof initialState

type SetUserDataActionType = ReturnType<typeof setUserData>
type GetCaptchaUrlActionType = ReturnType<typeof getCaptchaUrlSuccess>
type ClearCaptchaActionType = ReturnType<typeof clearCaptcha>

export type AuthReducerActionTypes = SetUserDataActionType
    | GetCaptchaUrlActionType
    | ClearCaptchaActionType
