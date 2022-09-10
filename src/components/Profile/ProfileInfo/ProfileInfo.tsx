import React, {ChangeEvent, useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import {UserProfileType} from '../../../Redux/Profile-reducer';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.jpg';
import {ProfileDataReduxForm} from './ProfileDataForm';
import {ProfileData} from './ProfileData';

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: UserProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (formData: UserProfileType) => Promise<undefined>
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         isOwner,
                                                         profile,
                                                         status,
                                                         updateStatus,
                                                         savePhoto,
                                                         saveProfile,
                                                     }) => {

    const [editMode, setEditMode] = useState(false);

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

    const onSubmit = (formData: UserProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        });
    };

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img
                    src={(profile.photos && profile.photos.large) || userPhoto}
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
                {
                    editMode
                        ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                        : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={() => setEditMode(true)}/>
                }
                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    );
};

export default ProfileInfo;