import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {UserProfileType} from "../../../Redux/Profile-reducer";

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
                <img
                    src='https://www.culture.ru/storage/images/bab1ddcc0713875c174b044b475d0fee/4feb4a73ea13139d24b5dedfae4637e7.jpeg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;