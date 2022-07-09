import {ReduxStateType} from './Redux-Store';

export const getUsers = (state: ReduxStateType) => {
    return state.usersPage.users;
};

export const getPageSize = (state: ReduxStateType) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: ReduxStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: ReduxStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: ReduxStateType) => {
    return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: ReduxStateType) => {
    return state.usersPage.followingInProgress;
};