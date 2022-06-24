import {Field, reduxForm} from 'redux-form';

export const LoginForm = () => {
    return (
        <form>
            <div>
                <Field placeholder={'Login'} name={'login'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'}/> remember me
            </div>
            <button>Login</button>
        </form>
    );
};

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export const Login = () => {
    return (
        <div>
            <h1>
                LOGIN
            </h1>
            <LoginReduxForm/>
        </div>
    );
};
