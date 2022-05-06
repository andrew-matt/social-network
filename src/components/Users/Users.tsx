import {UsersType} from "../../Redux/Users-reducer";
import s from './Users.module.css'
import React from "react";
import axios from "axios";
import userPhoto from '../../assets/images/user.jpg'

type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}

class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        return (
            <div>
                {
                    this.props.users.map(u => {
                        return (
                            <div key={u.id}>
                            <span>
                                <div>
                                    <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={'avatar'}
                                         className={s.userPhoto}/>
                                </div>
                                <div>
                                    {
                                        u.followed
                                            ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                                            : <button onClick={() => this.props.follow(u.id)}>Follow</button>
                                    }
                                </div>
                            </span>
                                <span>
                                <span>
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>
                                </span>
                                <span>
                                    <div>{"u.location.country"}</div>
                                    <div>{"u.location.city"}</div>
                                </span>
                            </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Users;