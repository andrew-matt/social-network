import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormControls/FormControls';
import {maxLength30, required} from '../../utils/validators';
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

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={'Email'}
                    name={'email'}
                    component={Input}
                    validate={[required, maxLength30]}
                />
            </div>
            <div>
                <Field
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    component={Input}
                    validate={[required, maxLength30]}
                />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'}/> remember me
            </div>
            {
                props.error &&
                <div className={styles.formSummaryError}>
                    {props.error}
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
            <LoginReduxForm onSubmit={onSubmit}/>
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