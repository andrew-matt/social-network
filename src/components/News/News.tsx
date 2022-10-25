import React from 'react';
import workImage from 'assets/images/workInProgress.png'
import style from './News.module.css'

export const News = () => {
    return (
        <div className={style.imageWrapper}>
            <img src={workImage} className={style.image} alt={'work in progress'}/>
        </div>
    )
}
