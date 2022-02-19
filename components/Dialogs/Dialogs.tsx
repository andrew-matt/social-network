import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from './Message/Message';

export const Dialogs = () => {

    let dialogs = [
        {id: 1, name: "Andrew"},
        {id: 2, name: "Hannah"},
        {id: 3, name: "William"},
        {id: 4, name: "Jennifer"},
        {id: 5, name: "Holly"}
    ]

    let message = [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you"},
        {id: 3, message: "Hell yeah"}
    ]

    let dialogElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messageElements = message.map(m => <Message message={m.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
        </div>
    )
}
