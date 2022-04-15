import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {ActionType, PostType} from "../../../Redux/Store";
import {AddPostActionCreator, UpdateNewPostTextActionCreator} from "../../../Redux/Profile-reducer";

export type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: ActionType) => void
}

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let addPost = () => {
        props.dispatch(AddPostActionCreator())
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(UpdateNewPostTextActionCreator(e.currentTarget.value))
    }

    return <div className={s.postsBlock}>
        <div>
            <h3>
                My posts
            </h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    </div>
}

export default MyPosts;