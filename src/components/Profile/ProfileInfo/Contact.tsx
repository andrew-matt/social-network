import React, {FC} from 'react';
import style from './ProfileInfo.module.css';

type ContactType = {
    contactTitle: string
    contactValue: string | undefined
}

export const Contact: FC<ContactType> = ({contactTitle, contactValue}) => {
    return (
        <div className={style.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};