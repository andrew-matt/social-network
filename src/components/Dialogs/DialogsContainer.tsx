import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {AppRootStateType} from 'app/store';
import {compose, Dispatch} from 'redux';
import React from 'react';
import {withAuthRedirect} from 'hoc/withAuthRedirect';
import {DialogPageType, sendMessage} from 'components/Dialogs/dialogs-reducer'

type MapStateToPropsType = {
    dialogsPage: DialogPageType
}

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessage(newMessageBody));
        },
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs);