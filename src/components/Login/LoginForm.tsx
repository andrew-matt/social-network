import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormControls/FormControls';
import {maxLength30, required} from '../../utils/validators/validators';
import styles from '../common/FormControls/FormsControls.module.css';

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormPropsType> & LoginFormPropsType> = ({
                                                                                                                handleSubmit,
                                                                                                                error,
                                                                                                                captchaUrl,
                                                                                                            }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required, maxLength30], Input)}
            {createField('Password', 'password', [required, maxLength30], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
            {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input)}
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

export const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormPropsType>({form: 'login'})(LoginForm);

//types
export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormPropsType = {
    captchaUrl: string | null
}