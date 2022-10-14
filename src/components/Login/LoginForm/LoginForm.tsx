import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {CheckBox, createField, Input} from 'components/common/FormControls/FormControl'
import {
    captchaRequired,
    emailRequired,
    emailValidation,
    maxLength30,
    passwordRequired,
} from 'utils/validators/validators'
import style from './LoginForm.module.css'

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormPropsType> & LoginFormPropsType> = ({
                                                                                                                handleSubmit,
                                                                                                                error,
                                                                                                                captchaUrl,
                                                                                                            }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [emailRequired, emailValidation, maxLength30], Input, {className: `${style.formField} ${style.loginField}`})}
            {createField('Password', 'password', [passwordRequired, maxLength30], Input, {
                type: 'password',
                className: `${style.formField} ${style.passwordField}`,
            })}
            {createField(null, 'rememberMe', [], CheckBox, {}, 'Remember me')}
            {captchaUrl &&
                <div className={style.captchaImageWrapper}>
                    <img
                        src={captchaUrl}
                        style={{borderRadius: '8px'}}
                        alt={'captcha'}
                    />
                </div>}
            {captchaUrl && createField('Symbols from image', 'captcha', [captchaRequired], Input, {
                className: `${style.formField} ${style.captchaField}`,
                error,
            })}
            <div className={style.buttonContainer}>
                <button className={style.button}>Log in</button>
            </div>
            <div className={style.fieldsErrorWrapper}>
                <div
                    className={`${style.fieldsError} ${error === 'Incorrect Email or Password' && style.fieldsErrorShow}`}>
                    {error === 'Incorrect Email or Password' && error}
                </div>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormPropsType>({form: 'login'})(LoginForm)

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