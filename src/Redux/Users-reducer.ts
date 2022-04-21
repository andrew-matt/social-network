import {ActionTypes} from "./Redux-Store";

export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
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
    users: [
        {
            id: 1,
            photoUrl: 'https://resizer.mail.ru/p/7a1e86df-9686-5098-963e-27304c6f1133/AAACY37OntEVxnf9OOUuLkcQpyEwVtb3AZgK14eU9OI6IljiYtBizDmEp-vG8UfPC3h-OB130PE-ba1mk1rY6S-3Zek.jpg',
            followed: true,
            fullName: "Bob",
            status: "Hell yeah",
            location: {city: "Washington", country: "USA"}
        },
        {
            id: 2,
            photoUrl: 'https://resizer.mail.ru/p/7a1e86df-9686-5098-963e-27304c6f1133/AAACY37OntEVxnf9OOUuLkcQpyEwVtb3AZgK14eU9OI6IljiYtBizDmEp-vG8UfPC3h-OB130PE-ba1mk1rY6S-3Zek.jpg',
            followed: false,
            fullName: "John",
            status: "Sonic Boom",
            location: {city: "Moscow", country: "Russia"}
        },
        {
            id: 3,
            photoUrl: 'https://resizer.mail.ru/p/7a1e86df-9686-5098-963e-27304c6f1133/AAACY37OntEVxnf9OOUuLkcQpyEwVtb3AZgK14eU9OI6IljiYtBizDmEp-vG8UfPC3h-OB130PE-ba1mk1rY6S-3Zek.jpg',
            followed: false,
            fullName: "Ann",
            status: "Get over here",
            location: {city: "Berlin", country: "Germany"}
        },
        {
            id: 4,
            photoUrl: 'https://resizer.mail.ru/p/7a1e86df-9686-5098-963e-27304c6f1133/AAACY37OntEVxnf9OOUuLkcQpyEwVtb3AZgK14eU9OI6IljiYtBizDmEp-vG8UfPC3h-OB130PE-ba1mk1rY6S-3Zek.jpg',
            followed: true,
            fullName: "Helen",
            status: "Make some noise",
            location: {city: "Oslo", country: "Norway"}
        },
    ] as UsersType[]
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