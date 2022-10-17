export type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

export type DialogPageType = typeof initialState

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

export const dialogsReducer = (state: DialogPageType = initialState, {type, payload}: DialogsReducerActionTypes): DialogPageType => {
    switch (type) {
        case 'dialogs/SEND-MESSAGE':
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: 4,
                        message: payload.newMessageBody,
                    },
                ],
            };
        default:
            return state;
    }
};

//actions
export const sendMessage = (newMessageBody: string) => ({type: 'dialogs/SEND-MESSAGE', payload: {newMessageBody}} as const);

//types
type SendMessageType = ReturnType<typeof sendMessage>

export type DialogsReducerActionTypes = SendMessageType

