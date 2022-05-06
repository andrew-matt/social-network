import {ActionTypes} from "./Redux-Store";

export type UsersType = {
    id: number
    photos: {
        small: string
    }
    followed: boolean
    name: string
    status: string
    location: {
        city: string
        country: string
    }
}

export type UsersPageType = typeof initialState

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

const initialState = {
    users: [] as UsersType[]
}

const usersReducer = (state: UsersPageType = initialState, action: ActionTypes): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}
export const FollowAC = (userId: number) => ({type: FOLLOW, userId: userId} as const)
export const UnfollowAC = (userId: number) => ({type: UNFOLLOW, userId: userId} as const)
export const SetUsersAC = (users: UsersType[]) => ({type: SET_USERS, users: users} as const)

export default usersReducer;