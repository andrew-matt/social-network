import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Dialogs.module.css';

type DialogItemPropsType = {
    name: string
    id: number
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

type MessagePropsType = {
    message: string
}

const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export const Dialogs = () => {

    let dialogsData = [
        {id: 1, name: "Andrew"},
        {id: 2, name: "Hannah"},
        {id: 3, name: "William"},
        {id: 4, name: "Jennifer"},
        {id: 5, name: "Holly"}
    ]

    let messageData = [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you"},
        {id: 3, message: "Hell yeah"}
    ]

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <DialogItem name="Andrew" id={1}/>
                <DialogItem name="Hannah" id={2}/>
                <DialogItem name="William" id={3}/>
                <DialogItem name="Jennifer" id={4}/>
                <DialogItem name="Holly" id={5}/>
            </div>
            <div className={s.messages}>
                <Message message="Hi"/>
                <Message message="How are you"/>
                <Message message="Hell yeah"/>
            </div>
        </div>
    )
}
