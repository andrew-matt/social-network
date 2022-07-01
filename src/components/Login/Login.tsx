import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormControls/FormControls';
import {maxLength30, required} from '../../utils/validators';
import {login} from '../../Redux/Auth-reducer';
import {connect} from 'react-redux';

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
            <button>Login</button>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    return (
        <div>
            <h1>
                LOGIN
            </h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default connect(null, {login})(Login);