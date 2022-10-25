import {connect} from 'react-redux'
import {AppRootStateType} from 'app/store'
import {
    follow,
    requestUsers,
    setCurrentPage,
    unfollow,
    UsersType,
} from 'components/Users/users-reducer'
import React from 'react'
import {Users} from 'components/Users/Users'
import {Preloader} from 'components/common/Preloader/Preloader'
import {compose} from 'redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from 'components/Users/users-selectors'
import {withAuthRedirect} from 'hoc/withAuthRedirect'
import style from './UsersContainer.module.css'

type UsersContainerPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    isFetching: boolean
    followingInProgress: number[]
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <div className={style.preloaderWrapper}><Preloader/></div> : null}
                <Users
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

// type MapDispatchToPropsType = {
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void
//     setUsers: (users: UsersType[]) => void
//     setCurrentPage: (currentPage: number) => void
//     setTotalUsersCount: (totalUsersCount: number) => void
//     setIsFetching: (isFetching: boolean) => void
// }

// const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     };
// };

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(follow(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollow(userId))
//         },
//         setUsers: (users: UsersType[]) => {
//             dispatch(setUsers(users))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(setCurrentPage(currentPage))
//         },
//         setTotalUsersCount: (totalUsersCount: number) => {
//             dispatch(setTotalUsersCount(totalUsersCount))
//         },
//         setIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetching(isFetching))
//         },
//     }
// }

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        getUsers: requestUsers,
    }),
    withAuthRedirect,
)(UsersContainer)