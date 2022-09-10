import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../Redux/Profile-reducer';

type ProfilePropsType = {
    isOwner: boolean
    profile: UserProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (formData: UserProfileType) => Promise<undefined>
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    );
};