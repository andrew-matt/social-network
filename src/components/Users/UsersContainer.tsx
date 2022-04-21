import {connect} from "react-redux";
import Users from "./Users";
import {ReduxStateType} from "../../Redux/Redux-Store";
import {FollowAC, SetUsersAC, UnfollowAC, UsersType} from "../../Redux/Users-reducer";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    users: UsersType[]
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(FollowAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(UnfollowAC(userId))
        },
        setUsers: (users: UsersType[]) => {
            dispatch(SetUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)