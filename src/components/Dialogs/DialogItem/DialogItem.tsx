import React from 'react';
import {NavLink} from 'react-router-dom';
import s from '../Dialogs.module.css';
import {DialogType} from "../../../Redux/State";

export type DialogItemPropsType = DialogType

export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let path = '/dialogs/' + props.id;

    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}
