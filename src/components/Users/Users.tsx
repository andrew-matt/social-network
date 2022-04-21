import {UsersType} from "../../Redux/Users-reducer";
import s from './Users.module.css'
import React from "react";

type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}

export const Users: React.FC<UsersPropsType> = (props) => {
    return (
        <div>
            {
                props.users.map(u => {
                    return (
                        <div key={u.id}>
                            <span>
                                <div>
                                    <img src={u.photoUrl} alt={'avatar'} className={s.userPhoto}/>
                                </div>
                                <div>
                                    {
                                        u.followed
                                            ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                                            : <button onClick={() => props.follow(u.id)}>Follow</button>
                                    }
                                </div>
                            </span>
                            <span>
                                <span>
                                    <div>{u.fullName}</div>
                                    <div>{u.status}</div>
                                </span>
                                <span>
                                    <div>{u.location.country}</div>
                                    <div>{u.location.city}</div>
                                </span>
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Users;