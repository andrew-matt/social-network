import {ActionTypes} from "./Redux-Store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
    profile: null | UserProfileType
}
export type UserProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post!", likesCount: 20}
    ] as PostType[],
    newPostText: '',
    profile: null
}

const profileReducer = (state = initialState, action: ActionTypes): ProfilePageType => {
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
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }
}

export const AddPostActionCreator = () => ({type: ADD_POST} as const)
export const UpdateNewPostTextActionCreator = (newText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
} as const)
export const setUserProfile = (profile: UserProfileType) => ({
    type: SET_USER_PROFILE,
    profile: profile
} as const)

export const getUserProfile = (userId: number | string) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(data => {
        dispatch(setUserProfile(data));
    });
}

export default profileReducer;