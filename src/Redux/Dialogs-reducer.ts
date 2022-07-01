import {ActionTypes} from './Redux-Store';

export type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

export type DialogPageType = typeof initialState

const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
    dialogs: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Hannah'},
        {id: 3, name: 'William'},
        {id: 4, name: 'Jennifer'},
        {id: 5, name: 'Holly'},
    ] as DialogType[],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Hell yeah'},
    ] as MessageType[],
};

const dialogsReducer = (state: DialogPageType = initialState, action: ActionTypes): DialogPageType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,

            };
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: 4,
                        message: action.newMessageBody,
                    },
                ],
            };
        default:
            return state;
    }
};

export const SendMessageAC = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const);
export const UpdateNewMessageAC = (body: string) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body,
} as const);


export default dialogsReducer;