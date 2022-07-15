import React, {useState} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

function ProfileStatusWithHooks(props: ProfileStatusPropsType) {

    const [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
    };

    return (
        <div>
            {
                !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
            }
            {
                editMode &&
                <div>
                    <input onBlur={deactivateEditMode} autoFocus/>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;