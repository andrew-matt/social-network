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
    setTotalUsersCount: (totalUsersCount: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
}

class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {

        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let curP = this.props.currentPage;
        let curPF = ((curP - 5) < 0) ?  0  : curP - 5;
        let curPL = ((curP - 5) < 0) ?  10  : curP + 5;
        let slicedPages = pages.slice( curPF, curPL);

        return (
            <div>
                <div className={s.pages}>
                    {slicedPages.map((p, index) => {

                        const pageNumberClass = s.page_number + " " + (this.props.currentPage === p && s.selected)

                        return <span key={index} onClick={() => this.onPageChanged(p)} className={pageNumberClass}>{p}</span>
                    })}
                </div>
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