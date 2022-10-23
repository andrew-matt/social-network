import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './DialogItem.module.css';
import {DialogType} from "components/Dialogs/dialogs-reducer";

export type DialogItemPropsType = DialogType

export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let path = '/dialogs/' + props.id;

    return (
        <div className={style.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}
