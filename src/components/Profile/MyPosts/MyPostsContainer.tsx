import React from 'react';
import {AddPostActionCreator, UpdateNewPostTextActionCreator} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {ReduxStoreType} from "../../../Redux/Redux-Store";

export type MyPostsContainerType = {
    store: ReduxStoreType
}

const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {

    let state = props.store.getState()

    let addPost = () => {
        props.store.dispatch(AddPostActionCreator())
    }

    let onPostChange = (text: string) => {
        let action = UpdateNewPostTextActionCreator(text)
        props.store.dispatch(action)
    }

    return (
        <MyPosts
            updateNewPostText={onPostChange}
            addPost={addPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
        />
    )
}

export default MyPostsContainer;