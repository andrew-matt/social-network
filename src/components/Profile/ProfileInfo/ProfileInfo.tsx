import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import {UserProfileType} from '../../../Redux/Profile-reducer';

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
            <div>
                <img src="https://wallpaperaccess.com/full/846666.jpg" width="900px"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;