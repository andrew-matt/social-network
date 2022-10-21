import React, {FC} from 'react'
import {UserProfileType} from 'components/Profile/profile-reducer'
import {CheckBox, createField, Input} from 'components/common/FormControls/FormControl'
import {InjectedFormProps, reduxForm} from 'redux-form'
import style from 'components/Profile/ProfileInfo/profileData/ProfileData.module.css'
import styles from 'components/Profile/ProfileInfo/profileDataForm/ProfileDataForm.module.css'

const ProfileDataForm: FC<ProfileDataFormType & InjectedFormProps<{}, ProfileDataFormType>> = ({
                                                                                                   handleSubmit,
                                                                                                   profile,
                                                                                                   error,
                                                                                                   isLoading,
                                                                                               }) => {
    return (
        <form onSubmit={handleSubmit}
              spellCheck={'false'}
        >
            {error && <>{error}</>}
            <div className={style.profileDataItem} style={{border: 'none'}}>
                <span
                    className={`${style.profileDataItemName} ${style.profileDataItemHeader}`}>
                    <button className={style.button}
                            disabled={isLoading}>save data</button>
                    Profile
                </span>
            </div>
            <div className={style.descriptionContainer}>
                <div className={style.profileDataItem}>
                <span className={style.profileDataItemName}>
                    Name:
                </span>
                    <span className={style.profileDataItemDescription}
                          style={{padding: '0'}}>
                    {createField('', 'fullName', [], Input, {className: styles.inputField})}
                </span>
                </div>
                <div className={style.profileDataItem}>
                <span className={style.profileDataItemName}>
                    Looking for a job:
                </span>
                    <span className={style.profileDataItemDescription}
                          style={{padding: '0'}}>
                    {createField('', 'lookingForAJob', [], CheckBox, {
                        type: 'checkbox',
                        className: styles.checkBoxNew,
                        size: 'small',
                    })}
                </span>
                </div>
                <div className={style.profileDataItem}>
                <span className={style.profileDataItemName}>
                    My skills:
                </span>
                    <span className={style.profileDataItemDescription}
                          style={{padding: '0'}}>
                    {createField('', 'lookingForAJobDescription', [], Input, {className: styles.inputField})}
                </span>
                </div>
                <div className={style.profileDataItem}>
                <span className={style.profileDataItemName}>
                    About me:
                </span>
                    <span className={style.profileDataItemDescription}
                          style={{padding: '0'}}>
                    {createField('', 'aboutMe', [], Input, {className: styles.inputField})}
                </span>
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
                            <div className={style.profileDataItem} key={key}>
                                <span className={style.profileDataItemName}>{key}:</span>
                                {createField('', 'contacts.' + key, [], Input, {className: styles.inputField})}
                            </div>
                        )
                    })
                }
            </div>
        </form>
    )
}

//types
export type ProfileDataFormType = {
    profile: UserProfileType
    isLoading: boolean
}

export const ProfileDataReduxForm = reduxForm<{}, ProfileDataFormType>({form: 'edit-profile'})(ProfileDataForm)
