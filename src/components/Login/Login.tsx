import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormControls/FormControls';
import {maxLength30, required} from '../../utils/validators/validators';
import {login} from '../../Redux/Auth-reducer';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {ReduxStateType} from '../../Redux/Redux-Store';
import styles from '../common/FormControls/FormsControls.module.css';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required, maxLength30], Input)}
            {createField('Password', 'password', [required, maxLength30], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
            {
                error &&
                <div className={styles.formSummaryError}>
                    {error}
                </div>
            }
            <button>Login</button>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);

type LoginPropsType = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean) => void
}

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>;
    }

    return (
        <div>
            <h1>
                LOGIN
            </h1>
            <LoginReduxForm initialValues={{email: process.env.REACT_APP_LOGIN, password: process.env.REACT_APP_PASSWORD}} onSubmit={onSubmit}/>
        </div>
    );
};

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
    };
};

export default connect(mapStateToProps, {login})(Login);