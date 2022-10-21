import React, {FC} from 'react'
import style from 'components/Profile/ProfileInfo/profileData/ProfileData.module.css'

type ContactType = {
    contactTitle: string
    contactValue: string | undefined
}

export const Contact: FC<ContactType> = ({contactTitle, contactValue}) => {
    return (
        <div className={style.profileDataItem}>
            <span className={style.profileDataItemName}>{contactTitle}:</span>
            <span className={style.profileDataItemDescription}>{contactValue}</span>
        </div>
    )
}