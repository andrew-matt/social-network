import React from 'react';
import s from './Post.module.css';
import {MyPostsPropsType} from "../MyPosts";

const Post = (props: MyPostsPropsType) => {

    return (
        <div className={s.item}>
            <img
                src={"https://i.kym-cdn.com/photos/images/facebook/000/037/415/Avatar_Me_by_PinkLace.jpg"}/>
            { props.message }
            <div>
                <span>{ props.likecounts }</span>
            </div>
        </div>
    )
}

export default Post;