import React from 'react';
import {sendMessageCreator, UpdateNewMessageActionCreator} from "../../Redux/Dialogs-reducer";
import store from "../../Redux/Redux-Store";
import StoreContext from '../../StoreContext';
import {Dialogs} from "./Dialogs";

export type DialogsPropsType = {}

const DialogsContainer: React.FC<DialogsPropsType> = (props) => {

    return (
        <StoreContext.Consumer>
            {(store) => {

                let state = store.getState().dialogsPage

                const onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                }

                const onMessageChange = (body: string) => {
                    store.dispatch(UpdateNewMessageActionCreator(body))
                }

                return (
                    <Dialogs
                        updateNewMessageBody={onMessageChange}
                        sendMessage={onSendMessageClick}
                        dialogsPage={state}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;
