import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src='https://www.culture.ru/storage/images/bab1ddcc0713875c174b044b475d0fee/4feb4a73ea13139d24b5dedfae4637e7.jpeg'/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;