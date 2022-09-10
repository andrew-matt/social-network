import React, {FC} from 'react';
import {UserProfileType} from '../../../Redux/Profile-reducer';
import {Contact} from './Contact';

type ProfileDataType = {
    profile: UserProfileType
    isOwner?: boolean
    activateEditMode?: () => void
}

export const ProfileData: FC<ProfileDataType> = ({profile, isOwner, activateEditMode}) => {
    return (
        <div>
            {
                isOwner &&
                <div>
                    <button onClick={activateEditMode}>edit</button>
                </div>
            }
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
