import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message,} from './Message/Message';
import {DialogPageType} from "../../Redux/State";

export type DialogsPropsType = {
    state: DialogPageType
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messageElements = props.state.messages.map(m => <Message message={m.message}/>);

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
