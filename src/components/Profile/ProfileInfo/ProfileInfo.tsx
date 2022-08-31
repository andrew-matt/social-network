import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import {UserProfileType} from '../../../Redux/Profile-reducer';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/user.jpg";

type ProfileInfoPropsType = {
    profile: UserProfileType
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    if (!props.profile) {
        return (
            <Preloader/>
        );
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={style.mainPhoto} alt={'user'}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
};

export default ProfileInfo;