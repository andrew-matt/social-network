import {usersAPI} from 'api/api'
import {Dispatch} from 'Redux'
import {AxiosResponse} from 'axios'
import {updateObjectInArray} from 'utils/object-helpers'
import {setIsLoading} from 'app/app-reducer'

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

const initialState = {
    users: [] as UsersType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    fake: 10,
}

export const usersReducer = (state: UsersPageType = initialState, action: UsersReducerActionTypes): UsersPageType => {
    switch (action.type) {
        case 'users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
            }
        case 'users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
            }
        case 'users/SET-USERS':
            return {...state, users: action.users}
        case 'users/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'users/SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'users/TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'users/TOGGLE-IS-FOLLOWING-PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }
        default:
            return state
    }
}

//actions
export const followSuccess = (userId: number) => ({
    type: 'users/FOLLOW',
    userId: userId,
} as const)

export const unfollowSuccess = (userId: number) => ({
    type: 'users/UNFOLLOW',
    userId: userId,
} as const)

export const setUsers = (users: UsersType[]) => ({
    type: 'users/SET-USERS',
    users: users,
} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: 'users/SET-CURRENT-PAGE',
    currentPage: currentPage,
} as const)

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: 'users/SET-TOTAL-USERS-COUNT',
    totalUsersCount: totalUsersCount,
} as const)

export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'users/TOGGLE-IS-FETCHING',
    isFetching: isFetching,
} as const)

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'users/TOGGLE-IS-FOLLOWING-PROGRESS',
    isFetching: isFetching,
    userId: userId,
} as const)

// thunks
export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setTotalUsersCount(response.data.totalCount))
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) =>
    Promise<AxiosResponse>, actionCreator: (userId: number) => FollowSuccessType | UnFollowSuccessType) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    } finally {
        dispatch(setIsLoading(false))
    }
}

export const unfollow = (userId: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsLoading(true))
        await  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    } finally {
        dispatch(setIsLoading(false))
    }
}

//types
type FollowSuccessType = ReturnType<typeof followSuccess>
type UnFollowSuccessType = ReturnType<typeof unfollowSuccess>
type SetUsersType = ReturnType<typeof setUsers>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>
type ToggleFollowingProgressType = ReturnType<typeof toggleFollowingProgress>

export type UsersReducerActionTypes = FollowSuccessType
    | UnFollowSuccessType
    | SetUsersType
    | SetCurrentPageType
    | SetTotalUsersCountType
    | ToggleIsFetchingType
    | ToggleFollowingProgressType