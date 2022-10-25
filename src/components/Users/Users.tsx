import style from './Users.module.css'
import styles from 'components/Profile/MyPosts/MyPosts.module.css'
import userPhoto from 'assets/images/user.png'
import React from 'react'
import {UsersType} from 'components/Users/users-reducer'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'

type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress: number[]
}

export const Users: React.FC<UsersPropsType> = (props) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let currentPage = props.currentPage
    let currentPageFirst
    let currentPageLast

    if (currentPage - 5 < 0) {
        currentPageFirst = 0
    } else if (currentPage + 5 > pagesCount) {
        currentPageFirst = currentPage - (10 - (pagesCount - currentPage))
    } else {
        currentPageFirst = currentPage - 5
    }

    if (currentPage - 5 < 0) {
        currentPageLast = 10
    } else if (currentPage + 5 > pagesCount) {
        currentPageLast = pagesCount
    } else {
        currentPageLast = currentPage + 5
    }

    // let currentPageFirst = ((currentPage - 5) < 0) ? 0 : currentPage - 5
    // let currentPageLast = ((currentPage - 5) < 0) ? 10 : currentPage + 5
    let slicedPages = pages.slice(currentPageFirst, currentPageLast)

    return (
        <div className={style.block}>
            <div>
                {
                    props.users.map(u => {
                        return (
                            <div key={u.id} className={style.userContainer}>
                                <div>
                                    <NavLink to={'/profile/' + u.id}>
                                        <img
                                            src={u.photos.small !== null ? u.photos.small : userPhoto}
                                            alt={'avatar'}
                                            className={style.userPhoto}/>
                                    </NavLink>
                                </div>
                                <div className={style.userInfo}>
                                    <div>
                                        <div>{u.name}</div>
                                        <div>{u.status}</div>
                                    </div>
                                    <div>
                                        {
                                            u.followed
                                                ? <button
                                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                                    onClick={() => {
                                                        props.unfollow(u.id)
                                                    }}
                                                    className={styles.button}
                                                >
                                                    Unfollow
                                                </button>
                                                : <button
                                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                                    onClick={() => {
                                                        props.follow(u.id)
                                                    }}
                                                    className={styles.button}
                                                >
                                                    Follow
                                                </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={style.pagesWrapper}>
                <div className={style.pages}>
                    {
                        props.currentPage !== 1 &&
                        <>
                            <FontAwesomeIcon
                                icon={faAnglesLeft}
                                className={style.arrowIcon}
                                onClick={() => props.onPageChanged(1)}
                            />
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className={style.arrowIcon}
                                onClick={() => props.onPageChanged(props.currentPage - 1)}
                            />
                        </>
                    }
                    {slicedPages.map((page, index) => {

                        const pageNumberClass = `${style.page_number} ${(props.currentPage === page && style.selected)}`

                        return (
                            <span
                                key={index}
                                onClick={() => props.currentPage !== page && props.onPageChanged(page)}
                                className={pageNumberClass}
                                style={props.currentPage !== page ? {cursor: 'pointer'} : {cursor: 'auto'}}
                            >
                            {page}
                            </span>
                        )
                    })}
                    {
                        props.currentPage !== pagesCount &&
                        <>
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className={style.arrowIcon}
                                onClick={() => props.onPageChanged(props.currentPage + 1)}
                            />
                            <FontAwesomeIcon
                                icon={faAnglesRight}
                                className={style.arrowIcon}
                                onClick={() => props.onPageChanged(pagesCount)}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
