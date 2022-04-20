import {ActionTypes} from "./Redux-Store";

export type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

export type DialogPageType = typeof initialState

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        {id: 1, name: "Andrew"},
        {id: 2, name: "Hannah"},
        {id: 3, name: "William"},
        {id: 4, name: "Jennifer"},
        {id: 5, name: "Holly"}
    ] as DialogType[],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you"},
        {id: 3, message: "Hell yeah"}
    ] as MessageType[],
    newMessageText: ''
}

const dialogsReducer = (state: DialogPageType = initialState, action: ActionTypes): DialogPageType => {
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


export const sendMessageCreator = () => ({type: ADD_MESSAGE} as const)
export const UpdateNewMessageActionCreator = (newText: string) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: newText
} as const)


export default dialogsReducer;