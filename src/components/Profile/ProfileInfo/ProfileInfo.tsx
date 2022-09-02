import React, {ChangeEvent, FC} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import {UserProfileType} from '../../../Redux/Profile-reducer';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.jpg';

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: UserProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({isOwner, profile, status, updateStatus, savePhoto}) => {

    if (!profile) {
        return (
            <Preloader/>
        );
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img
                    src={profile.photos.large || userPhoto}
                    className={style.mainPhoto}
                    alt={'user'}
                />
                {
                    isOwner &&
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={onMainPhotoSelected}
                    />
                }
                <ProfileData profile={profile}/>
                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    );
};

type ProfileDataType = {
    profile: UserProfileType
}

const ProfileData: FC<ProfileDataType> = ({profile}) => {
    return (
        <div>
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts ? profile.contacts : []).map(key => {
                return (
                    <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts && profile.contacts[key as keyof typeof profile.contacts]}
                    />
                );
            })}
            </div>
        </div>
    );
};

type ContactType = {
    contactTitle: string
    contactValue: string | undefined
}

const Contact: FC<ContactType> = ({contactTitle, contactValue}) => {
    return (
        <div className={style.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};

export default ProfileInfo;