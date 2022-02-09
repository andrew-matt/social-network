import React from 'react';
import s from './Dialogs.module.css';

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <div className={s.dialog + ' ' + s.active}>
                    Andrew
                </div>
                <div className={s.dialog}>
                    Hannah
                </div>
                <div className={s.dialog}>
                    William
                </div>
                <div className={s.dialog}>
                    Jennifer
                </div>
                <div className={s.dialog}>
                    Holly
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>How are you</div>
                <div className={s.message}>Hell yeah</div>
            </div>
        </div>
    )
}
