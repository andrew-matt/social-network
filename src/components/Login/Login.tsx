import React from 'react';
import {login} from '../../Redux/Auth-reducer';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {AppRootStateType} from '../../Redux/Store';
import {LoginFormDataType, LoginReduxForm} from './LoginForm';

const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>;
    }

    return (
        <div>
            <h1>
                LOGIN
            </h1>
            <LoginReduxForm
                initialValues={{email: process.env.REACT_APP_LOGIN, password: process.env.REACT_APP_PASSWORD}}
                onSubmit={onSubmit}
                captchaUrl={props.captchaUrl}
            />
        </div>
    );
};

//types
type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    captchaUrl: string | null
}

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

//mapStateToProps
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
    };
};

export default connect(mapStateToProps, {login})(Login);