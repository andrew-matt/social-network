import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

function ProfileStatusWithHooks(props: ProfileStatusPropsType) {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {
                !editMode &&
                <div style={{width: '250px', marginTop: '20px'}}>
                    <b>Status: </b>
                    <i onDoubleClick={activateEditMode}>{props.status}</i>
                </div>
            }
            {
                editMode &&
                <div>
                    <input
                        value={status}
                        autoFocus
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                    />
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;