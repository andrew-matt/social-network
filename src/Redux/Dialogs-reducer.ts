import {ActionType, DialogPageType, MessageType} from "./State";

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const dialogsReducer = (state: DialogPageType, action: ActionType) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage: MessageType = {
                id: 4,
                message: state.newMessageText,
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText
            return state
        default:
            return state
    }
}


export const AddMessageActionCreator = () => ({type: ADD_MESSAGE} as const)
export const UpdateNewMessageActionCreator = (newText: string) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: newText
} as const)


export default dialogsReducer;