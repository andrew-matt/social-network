import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogPageType} from '../../Redux/Dialogs-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../common/FormControls/FormControls';
import {maxLengthCreator, required} from '../../utils/validators';


export type DialogsPropsType = {
    dialogsPage: DialogPageType
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean
}

type DialogsFormDataType = {
    newMessageBody: string
}

const maxLength10 = maxLengthCreator(10);

const AddMessageForm: React.FC<InjectedFormProps<DialogsFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'newMessageBody'}
                    component={Textarea}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    );
};

export const AddMessageReduxForm = reduxForm<DialogsFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm);

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
    let messageElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>);

    const addMessage = (formData: DialogsFormDataType) => {
        props.sendMessage(formData.newMessageBody);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <AddMessageReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    );
};

