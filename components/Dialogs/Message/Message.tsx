import React from 'react';
import s from '../Dialogs.module.css';

export type MessagePropsType = {
    id?: number
    message: string
}

export const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}