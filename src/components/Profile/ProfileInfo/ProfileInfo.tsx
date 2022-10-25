import React, {ChangeEvent, useState} from 'react'
import style from './ProfileInfo.module.css'
import {Preloader} from '../../common/Preloader/Preloader'
import {UserProfileType} from 'components/Profile/profile-reducer'
import ProfileStatusWithHooks from 'components/Profile/ProfileInfo/profileStatus/ProfileStatusWithHooks'
import userPhoto from 'assets/images/user.png'
import {ProfileDataReduxForm} from 'components/Profile/ProfileInfo/profileDataForm/ProfileDataForm'
import {ProfileData} from 'components/Profile/ProfileInfo/profileData/ProfileData'

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: UserProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (formData: UserProfileType) => Promise<undefined>
    isLoading: boolean
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         isOwner,
                                                         profile,
                                                         status,
                                                         updateStatus,
                                                         savePhoto,
                                                         saveProfile,
                                                         isLoading,
                                                     }) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return (
            <Preloader/>
        )
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: UserProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={style.profileHeader}>
                <label htmlFor="upload-photo" className={style.uploadPhotoLabel} style={isOwner ? {cursor: 'pointer'} : {cursor: 'default'}}>
                    <div className={style.mainPhotoWrapper} style={profile.photos?.large ? {borderRadius: '14px'} : {borderRadius: '100px'}}>
                        <img
                            src={(profile.photos && profile.photos.large) || userPhoto}
                            className={style.mainPhoto}
                            alt={'user'}
                            style={profile.photos?.large ? {borderRadius: '14px'} : {borderRadius: '100px'}}
                        />
                    </div>
                </label>
                {
                    isOwner &&
                    <input
                        type="file"
                        id="upload-photo"
                        accept=".png, .jpg, .jpeg"
                        onChange={onMainPhotoSelected}
                        className={style.uploadPhotoInput}
                    />
                }
            </div>
            <ProfileStatusWithHooks
                status={status}
                updateStatus={updateStatus}
                isOwner={isOwner}
            />
            <div className={style.descriptionBlock}>
                <div className={style.descriptionWrapper}>
                    {
                        editMode
                            ? <ProfileDataReduxForm
                                initialValues={profile}
                                profile={profile}
                                onSubmit={onSubmit}
                                isLoading={isLoading}
                            />
                            : <ProfileData
                                profile={profile}
                                isOwner={isOwner}
                                activateEditMode={() => setEditMode(true)}
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo