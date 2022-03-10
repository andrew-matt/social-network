import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../Redux/State";

export type ProfilePropsType = {
    state: ProfilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.state.posts} newPostText={props.state.newPostText} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>
        </div>
    )
}