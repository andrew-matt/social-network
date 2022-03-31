export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}
type AddPostActionType = {
    type: 'ADD-POST'
}
type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}
type AddMessageActionType = {
    type: 'ADD-MESSAGE'
}
type UpdateNewNewMessageActionType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT'
    newText: string
}
export type ActionType = AddPostActionType | UpdateNewPostTextActionType | AddMessageActionType | UpdateNewNewMessageActionType
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    dispatch: (action: ActionType) => void
    subscribe: (observer: () => void) => void
}


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 15},
                {id: 2, message: "It's my first post!", likesCount: 20}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Andrew"},
                {id: 2, name: "Hannah"},
                {id: 3, name: "William"},
                {id: 4, name: "Jennifer"},
                {id: 5, name: "Holly"}
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How are you"},
                {id: 3, message: "Hell yeah"}
            ],
            newMessageText: ''
        }
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('State is changed')
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost: PostType = {
                id: 3,
                message: this._state.profilePage.newPostText,
                likesCount: 4
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber()
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            if (action.newText) {
                this._state.profilePage.newPostText = action.newText
                this._callSubscriber()
            }
        } else if (action.type === 'ADD-MESSAGE') {
            let newMessage: MessageType = {
                id: 4,
                message: this._state.dialogsPage.newMessageText,
            }
            this._state.dialogsPage.messages.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber()
        } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            if (action.newText) {
                this._state.dialogsPage.newMessageText = action.newText
                this._callSubscriber()
            }
        }
    },
}

export default store;
