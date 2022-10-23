import React from 'react'
import style from './Dialogs.module.css'
import styles from 'components/Profile/MyPosts/MyPosts.module.css'
import {DialogItem} from './DialogItem/DialogItem'
import {Message} from './Message/Message'
import {DialogPageType} from 'components/Dialogs/dialogs-reducer'
import {Field, InjectedFormProps, reduxForm, reset} from 'redux-form'
import {Textarea} from 'components/common/FormControls/FormControl'
import {maxLength200, messageRequired} from 'utils/validators/validators'
import {useDispatch} from 'react-redux'

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
            <Field
                name={'newMessageBody'}
                component={Textarea}
                validate={[messageRequired, maxLength200]}
                placeholder={'Type a message'}
                cols={50}
                rows={5}
                className={styles.textArea}
            />
            <button className={styles.button}>Add message</button>
        </form>
    );
};

export const AddMessageReduxForm = reduxForm<DialogsFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm);

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const dispatch = useDispatch();

    let dialogElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
    let messageElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>);

    const addMessage = (formData: DialogsFormDataType) => {
        props.sendMessage(formData.newMessageBody);
        dispatch(reset('dialogAddMessageForm'))
    };

    return (
        <div className={style.dialogs}>
            <div>
                {dialogElements}
            </div>
            <div className={style.messagesWrapper}>
                <AddMessageReduxForm onSubmit={addMessage}/>
                <div className={style.messages}>{messageElements}</div>
            </div>
        </div>
    );
};

