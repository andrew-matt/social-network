import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/Redux-Store";
import {
    follow,
    setCurrentPage, toggleIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow,
    UsersType
} from "../../Redux/Users-reducer";
import {Dispatch} from "redux";
import React from "react";
import axios from "axios";
import Users from "./Users";
import preloader from "../../assets/images/preloader.svg"
import Preloader from "../common/Preloader/Preloader";

type UsersContainerPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
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
}

// type MapDispatchToPropsType = {
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void
//     setUsers: (users: UsersType[]) => void
//     setCurrentPage: (currentPage: number) => void
//     setTotalUsersCount: (totalUsersCount: number) => void
//     setIsFetching: (isFetching: boolean) => void
// }

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
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

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
})(UsersContainer);