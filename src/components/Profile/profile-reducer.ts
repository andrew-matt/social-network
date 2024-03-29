import {AppThunk} from 'app/store'
import {Dispatch} from 'Redux'
import {profileAPI, usersAPI} from 'api/api'
import {stopSubmit} from 'redux-form'
import {setIsLoading} from 'app/app-reducer'

const initialState = {
    posts: [
        {id: 1, message: `These Aren't The Droids You're Looking For`, likesCount: 15},
        {id: 2, message: `May the Object be with you`, likesCount: 20},
    ] as PostType[],
    profile: null as null | UserProfileType,
    ownerProfilePhoto: null as null | {
        small: string
        large: string
    },
    status: '',
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case 'profile/ADD-POST':
            let newPost: PostType = {
                id: state.posts[state.posts.length - 1].id + 1,
                message: action.newPostText,
            }
            return {...state, posts: [...state.posts, newPost]}
        case 'profile/SET-USER-PROFILE':
            return {...state, profile: action.profile}
        case 'profile/SET-STATUS':
            return {...state, status: action.status}
        case 'profile/SAVE-PHOTO-SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos}}
        case 'profile/SAVE-OWNER-PROFILE-PHOTO':
            return {...state, ownerProfilePhoto: action.photos}
        default:
            return state
    }
}

// actions
export const addPost = (newPostText: string) => ({
    type: 'profile/ADD-POST',
    newPostText,
} as const)

export const setUserProfile = (profile: UserProfileType) => ({
    type: 'profile/SET-USER-PROFILE',
    profile,
} as const)

export const setStatus = (status: string) => ({
    type: 'profile/SET-STATUS',
    status,
} as const)

export const savePhotoSuccess = (photos: { small: string, large: string }) => ({
    type: 'profile/SAVE-PHOTO-SUCCESS',
    photos,
} as const)

export const saveOwnerProfilePhoto = (photos: { small: string, large: string }) => ({
    type: 'profile/SAVE-OWNER-PROFILE-PHOTO',
    photos,
} as const)

// thunks
export const getUserProfile = (userId: number, isOwner?: boolean) => async (dispatch: Dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))

    if (isOwner) {
        dispatch(saveOwnerProfilePhoto(response.data.photos))
    }
}

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (photo: File) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
        dispatch(saveOwnerProfilePhoto(response.data.data.photos))
    }
}

export const saveProfile = (formData: UserProfileType): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true))
        const userId = getState().auth.userId
        const contacts = getState().profilePage.profile?.contacts
        const response = await profileAPI.saveProfile(formData)
        if (response.data.resultCode === 0) {
            await dispatch(getUserProfile(userId as number))
        } else {
            if (contacts) {
                const key = Object.keys(contacts).map(key => response.data.messages[0].toLowerCase().includes(key) ? key : '').join('')
                dispatch(stopSubmit('edit-profile', {'contacts': {[key]: response.data.messages[0]}}))
                return Promise.reject(response.data.messages[0])
            }
        }
    } finally {
        dispatch(setIsLoading(false))
    }
}

// types
type InitialStateType = typeof initialState

type AddPostType = ReturnType<typeof addPost>
type setUserProfileType = ReturnType<typeof setUserProfile>
type setStatusType = ReturnType<typeof setStatus>
type savePhotoSuccessType = ReturnType<typeof savePhotoSuccess>
type saveOwnerProfilePhotoType = ReturnType<typeof saveOwnerProfilePhoto>

export type ProfileReducerActionTypes = AddPostType
    | setUserProfileType
    | setStatusType
    | savePhotoSuccessType
    | saveOwnerProfilePhotoType

export type PostType = {
    id: number
    message: string
    likesCount?: number
}

export type ProfilePageType = {
    posts: PostType[]
    profile: null | UserProfileType
    status: string
}

export type UserProfileType = {
    aboutMe?: string
    userId?: number
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts?: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos?: {
        small: string
        large: string
    }
}


