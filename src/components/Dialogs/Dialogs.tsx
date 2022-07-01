import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogPageType} from '../../Redux/Dialogs-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';


export type DialogsPropsType = {
    dialogsPage: DialogPageType
    updateNewMessageBody: (body: string) => void
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean
}

type DialogsFormDataType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<DialogsFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newMessageBody'} component={'textarea'}/>
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    );
};

export const AddMessageReduxForm = reduxForm<DialogsFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm);

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const onSubmit = (formData: DialogsFormDataType) => {
        console.log(formData.newMessageBody);
    };

    let state = props.dialogsPage;

    let dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
    let messageElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>);

    const addMessage = (formData: DialogsFormDataType) => {
        props.sendMessage(formData.newMessageBody);
    };

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(e.currentTarget.value);
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

