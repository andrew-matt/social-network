import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import {UserProfileType} from '../../../Redux/Profile-reducer';
import ProfileStatus from './ProfileStatus';

type ProfileInfoPropsType = {
    profile: UserProfileType
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    if (!props.profile) {
        return (
            <Preloader/>
        )
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img src="https://wallpaperaccess.com/full/846666.jpg" width="900px"/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={'Hello my friends'}/>
            </div>
        </div>
    )
}

export default ProfileInfo;