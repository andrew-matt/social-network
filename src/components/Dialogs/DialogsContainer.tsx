import {
    DialogPageType,
    SendMessageAC,
    UpdateNewMessageAC
} from "../../Redux/Dialogs-reducer";
import {Dialogs, DialogsPropsType} from './Dialogs';
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/Redux-Store";
import {Dispatch} from "redux";
import {Navigate} from 'react-router-dom';
import React from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStateToPropsType = {
    dialogsPage: DialogPageType
    isAuth: boolean
}

type MapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(UpdateNewMessageAC(body))
        },
        sendMessage: () => {
            dispatch(SendMessageAC())
        }
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);


export default DialogsContainer;
