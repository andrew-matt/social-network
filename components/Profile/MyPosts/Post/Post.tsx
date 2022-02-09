import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    message: string
    likesCount: number
}

export const Post: React.FC<PostPropsType> = (props) => {

    return (
        <div className={s.item}>
            <img
                src={"https://i.kym-cdn.com/photos/images/facebook/000/037/415/Avatar_Me_by_PinkLace.jpg"}/>
            { props.message }
            <div>
                <span>{ props.likesCount } likes</span>
            </div>
        </div>
    )
}