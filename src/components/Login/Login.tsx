import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormControls/FormControls';
import {maxLength10, required} from '../../utils/validators';

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={'Login'}
                    name={'login'}
                    component={Input}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <Field
                    placeholder={'Password'}
                    name={'password'}
                    component={Input}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'}/> remember me
            </div>
            <button>Login</button>
        </form>
    );
};

export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);

export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData);
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
