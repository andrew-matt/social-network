import {
    DialogPageType,
    SendMessageAC,
    UpdateNewMessageAC
} from "../../Redux/Dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/Redux-Store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    dialogsPage: DialogPageType
}

type MapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer;
