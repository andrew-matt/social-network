import React, {FC} from 'react'
import {UserProfileType} from 'components/Profile/profile-reducer'
import {Contact} from 'components/Profile/ProfileInfo/profileData/contact/Contact'
import style from 'components/Profile/ProfileInfo/profileData/ProfileData.module.css'

type ProfileDataType = {
    profile: UserProfileType
    isOwner?: boolean
    activateEditMode?: () => void
}

export const ProfileData: FC<ProfileDataType> = ({
                                                     profile,
                                                     isOwner,
                                                     activateEditMode,
                                                 }) => {
    return (
        <div>
            <div className={style.profileDataItem} style={{border: 'none'}}>
                <span
                    className={`${style.profileDataItemName} ${style.profileDataItemHeader}`}>
                    {
                        isOwner &&
                        <button onClick={activateEditMode} className={style.button}>
                            edit profile
                        </button>
                    }
                    Profile
                </span>
            </div>
            <div className={style.descriptionContainer}>
                <div className={style.profileDataItem}>
                    <span className={style.profileDataItemName}>Name:</span>
                    <span
                        className={style.profileDataItemDescription}>{profile.fullName}</span>
                </div>
                <div className={style.profileDataItem}>
                    <span className={style.profileDataItemName}>Looking for a job:</span>
                    <span
                        className={style.profileDataItemDescription}>{profile.lookingForAJob ? 'yes' : 'no'}</span>
                </div>
                {
                    profile.lookingForAJob &&
                    <div className={style.profileDataItem}>
                    <span
                        className={style.profileDataItemName}>My skills:</span>
                        <span
                            className={style.profileDataItemDescription}>{profile.lookingForAJobDescription}</span>
                    </div>
                }
                <div className={style.profileDataItem}>
                    <span className={style.profileDataItemName}>About me:</span>
                    <span
                        className={style.profileDataItemDescription}>{profile.aboutMe}</span>
                </div>
            </div>
            <div className={style.profileDataItem} style={{border: 'none'}}>
                <span
                    className={`${style.profileDataItemName} ${style.profileDataItemHeader}`}>Contacts</span>
            </div>
            <div className={style.descriptionContainer}>
                {
                    Object.keys(profile.contacts ? profile.contacts : []).map(key => {
                        return (
                            <Contact
                                key={key}
                                contactTitle={key}
                                contactValue={profile.contacts && profile.contacts[key as keyof typeof profile.contacts]}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
