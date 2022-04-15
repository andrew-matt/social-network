import React from 'react';
import {sendMessageCreator, UpdateNewMessageActionCreator} from "../../Redux/Dialogs-reducer";
import store, {ReduxStoreType} from "../../Redux/Redux-Store";
import {Dialogs} from "./Dialogs";

export type DialogsPropsType = {
    store: ReduxStoreType
}

const DialogsContainer: React.FC<DialogsPropsType> = (props) => {

    let state = store.getState().dialogsPage

    const onSendMessageClick = () => {
       props.store.dispatch(sendMessageCreator())
    }

    const onMessageChange = (body: string) => {
        props.store.dispatch(UpdateNewMessageActionCreator(body))
    }

    return <Dialogs updateNewMessageBody={onMessageChange} sendMessage={onSendMessageClick} dialogsPage={state}/>
}

export default DialogsContainer;
