import React from 'react';
import style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogPageType} from 'components/Dialogs/dialogs-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from 'components/common/FormControls/FormControl';
import {maxLength30, required} from 'utils/validators/validators';

export type DialogsPropsType = {
    dialogsPage: DialogPageType
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
                <Field
                    name={'newMessageBody'}
                    component={Textarea}
                    validate={[required, maxLength30]}
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
        <div className={style.dialogs}>
            <div className={style.dialogsItem}>
                {dialogElements}
            </div>
            <div className={style.messages}>
                {messageElements}
                <AddMessageReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    );
};

