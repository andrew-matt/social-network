import React, {FC} from 'react';
import {UserProfileType} from '../../../Redux/Profile-reducer';
import {createField, Input, Textarea} from '../../common/FormControls/FormControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import styles from '../../common/FormControls/FormsControls.module.css';

export type ProfileDataFormType = {
    profile: UserProfileType
}

const ProfileDataForm: FC<ProfileDataFormType & InjectedFormProps<{}, ProfileDataFormType>> = ({
                                                                                                   handleSubmit,
                                                                                                   profile,
                                                                                                   error,
                                                                                               }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {
                error &&
                <div className={styles.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <b>Full name</b>: {createField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional
                    skills</b>: {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me</b>: {createField('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts ? profile.contacts : []).map(key => {
                return (
                    <div key={key}>
                        <b>{key}:</b> {createField(key, 'contacts.' + key, [], Input)}
                    </div>
                );
            })}
            </div>
        </form>
    );
};

export const ProfileDataReduxForm = reduxForm<{}, ProfileDataFormType>({form: 'edit-profile'})(ProfileDataForm);
