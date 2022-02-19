import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";

const MyPosts = () => {

    let postData = [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post!", likesCount: 20}
    ]

    let postElements = postData.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    return <div className={s.postsBlock}>
        <div>
            <h3>
                My posts
            </h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    </div>
}

export default MyPosts;