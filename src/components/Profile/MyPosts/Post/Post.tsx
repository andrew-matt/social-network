import React from 'react'
import style from './Post.module.css'
import userPhoto from 'assets/images/user.jpg'

type PostPropsType = {
    message: string
    likesCount?: number
    ownerProfilePhoto: null | { small: string, large: string }
}

export const Post: React.FC<PostPropsType> = (props) => {

    return (
        <div className={style.item}>
            <div className={style.imageAndTextWrapper}>
                <img
                    src={(props.ownerProfilePhoto && props.ownerProfilePhoto.large) || userPhoto}
                    alt={'user'}
                />
                {props.message}
            </div>
            {
                props.likesCount &&
                <div>
                    <span>{props.likesCount} likes</span>
                </div>
            }
        </div>
    )
}