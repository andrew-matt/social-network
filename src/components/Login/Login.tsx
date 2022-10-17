import React from 'react'
import {login} from 'app/auth/auth-reducer'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {AppRootStateType} from 'app/store'
import {LoginFormDataType, LoginReduxForm} from 'components/Login/LoginForm/LoginForm'
import style from './Login.module.css'
import LinearProgress from '@mui/material/LinearProgress'

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={style.backgroundImage}>
            <div className={style.linearProgressWrapper}>{props.isLoading && <LinearProgress className={style.linearProgress}/>}</div>
            <div className={style.loginFormContainer}>
                <div className={style.greetingsContainer}>
                    <div>Welcome</div>
                    <div>To log in please enter test credentials</div>
                    <div><span>email: </span>free@samuraijs.com</div>
                    <div><span>password: </span>free</div>
                </div>
                <LoginReduxForm
                    onSubmit={onSubmit}
                    captchaUrl={props.captchaUrl}
                />
            </div>
        </div>
    )
}

//types
type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    isLoading: boolean
    captchaUrl: string | null
}

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
    isLoading: boolean
}

//mapStateToProps
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
        isLoading: state.app.isLoading,
    }
}

export default connect(mapStateToProps, {login})(Login)