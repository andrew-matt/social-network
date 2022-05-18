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
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    users: [] as UsersType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}
export const followAC = (userId: number) => ({type: FOLLOW, userId: userId} as const)
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId: userId} as const)
export const setUsersAC = (users: UsersType[]) => ({type: SET_USERS, users: users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage: currentPage} as const)
export const setTotalUsersCountAC = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching} as const)

export default usersReducer;