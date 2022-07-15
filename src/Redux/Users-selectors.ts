import {ReduxStateType} from './Redux-Store';
import {createSelector} from 'reselect';

export const getUsersSelector = (state: ReduxStateType) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, users => {
    return users.filter(u => true);
});

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

export const countSomethingDifficult = (state: ReduxStateType) => {
    // for ... math ... big arrays
    let count = 23;
    return count;
};