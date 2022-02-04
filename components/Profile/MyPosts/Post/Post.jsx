import React from 'react';
import s from './Post.module.css';

const Post = () => {
    return (
        <div className={s.item}>
            <img
                src={"https://i.kym-cdn.com/photos/images/facebook/000/037/415/Avatar_Me_by_PinkLace.jpg"}/>
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    )
}

export default Post;