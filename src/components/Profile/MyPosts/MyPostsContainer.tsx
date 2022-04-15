import React, {ReactNode} from 'react';
import {AddPostActionCreator, UpdateNewPostTextActionCreator} from "../../../Redux/Profile-reducer";
import StoreContext from '../../../StoreContext';
import MyPosts from "./MyPosts";

export type MyPostsContainerType = {}

const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {

    return (
        <StoreContext.Consumer>
            {(store) => {

                let state = store.getState()

                let addPost = () => {
                    store.dispatch(AddPostActionCreator())
                }

                let onPostChange = (text: string) => {
                    let action = UpdateNewPostTextActionCreator(text)
                    store.dispatch(action)
                }

                return (
                    <MyPosts
                        updateNewPostText={onPostChange}
                        addPost={addPost}
                        posts={state.profilePage.posts}
                        newPostText={state.profilePage.newPostText}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;