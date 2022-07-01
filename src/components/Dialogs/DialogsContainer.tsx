import {DialogPageType, SendMessageAC} from '../../Redux/Dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {ReduxStateType} from '../../Redux/Redux-Store';
import {compose, Dispatch} from 'redux';
import React from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type MapStateToPropsType = {
    dialogsPage: DialogPageType
}

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(SendMessageAC(newMessageBody));
        },
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs);