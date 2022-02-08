import React from 'react';

type DialogsPropsType = {
    title: string
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    return (
        <div>
            {props.title}
        </div>
    )
}
