import React, {ChangeEvent, useEffect, useState} from 'react'
import style from 'components/Profile/ProfileInfo/profileStatus/ProfileStatusWithHooks.module.css'

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}

function ProfileStatusWithHooks(props: ProfileStatusPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={style.container}>
            {
                !editMode &&
                <div className={style.statusWrapper}
                     style={props.isOwner ? {cursor: 'pointer'} : {cursor: 'default'}}>
                    <i onClick={props.isOwner ? activateEditMode : () => {
                    }}>{props.status}</i>
                </div>
            }
            {
                editMode &&
                <div className={style.statusWrapper}>
                    <input
                        value={status}
                        autoFocus
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                        className={style.input}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks