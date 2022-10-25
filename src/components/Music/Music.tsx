import React from 'react';
import style from 'components/News/News.module.css'
import workImage from 'assets/images/workInProgress.png'

export const Music = () => {
    return (
        <div className={style.imageWrapper}>
            <img src={workImage} className={style.image} alt={'work in progress'}/>
        </div>
    )
}
