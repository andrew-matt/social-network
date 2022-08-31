import React from 'react';
import s from './Post.module.css';
import postAvatar from '../../../../assets/images/stromtrooper.jpg';

type PostPropsType = {
    message: string
    likesCount: number
}

export const Post: React.FC<PostPropsType> = (props) => {

    return (
        <div className={s.item}>
            <img src={postAvatar} alt={'postAvatar'}/>
            {props.message}
            <div>
                <span>{props.likesCount} likes</span>
            </div>
        </div>
    );
};