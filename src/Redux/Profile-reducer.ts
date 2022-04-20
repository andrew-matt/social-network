import {ActionTypes} from "./Redux-Store";

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = typeof initialState

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post!", likesCount: 20}
    ] as PostType[],
    newPostText: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostType = {
                id: 3,
                message: state.newPostText,
                likesCount: 4
            }
            return {
                ...state,
                posts: [
                    ...state.posts,
                    newPost
                ],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            let stateCopy = {
                ...state,
                posts: state.posts.map(p => ({...p}))
            }
            stateCopy.newPostText = action.newText
            return stateCopy
        default:
            return state
    }
}

export const AddPostActionCreator = () => ({type: ADD_POST} as const)
export const UpdateNewPostTextActionCreator = (newText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
} as const)

export default profileReducer;