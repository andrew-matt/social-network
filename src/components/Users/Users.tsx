import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import React from "react";
import {UsersType} from "../../Redux/Users-reducer";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Users: React.FC<UsersPropsType> = (props) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = ((curP - 5) < 0) ? 10 : curP + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div>
            <div className={s.pages}>
                {slicedPages.map((p, index) => {

                    const pageNumberClass = s.page_number + " " + (props.currentPage === p && s.selected)

                    return <span key={index} onClick={() => props.onPageChanged(p)}
                                 className={pageNumberClass}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => {
                    return (
                        <div key={u.id}>
                            <span>
                                <div>
                                    <NavLink to={'/Profile/' + u.id}>
                                    <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={'avatar'}
                                         className={s.userPhoto}/>
                                    </NavLink>
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

export default Users;