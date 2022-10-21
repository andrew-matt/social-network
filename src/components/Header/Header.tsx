import React, {useCallback, useEffect, useState} from 'react'
import style from './Header.module.css'
import styles from 'components/Login/Login.module.css'
import {NavLink} from 'react-router-dom'
import logo from 'assets/logo/logo.png'
import userPhoto from 'assets/images/user.jpg'
import {UserProfileType} from 'components/Profile/profile-reducer'
import LinearProgress from '@mui/material/LinearProgress'

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
    profile: UserProfileType | null
    isLoading: boolean
    ownerProfilePhoto: null | { small: string, large: string }
}

export const Header = (props: HeaderPropsType) => {
    const [showMenu, setShowMenu] = useState(false)

    const closeOnOutsideClick = useCallback((event: any): void => {
        if (event.target.id !== 'avatar' && showMenu) {
            setShowMenu(false)
        }
    }, [showMenu])

    useEffect(() => {
        document.body.addEventListener('click', closeOnOutsideClick)

        return function cleanup() {
            document.body.removeEventListener('click', closeOnOutsideClick)
        }
    }, [closeOnOutsideClick])

    return (
        <>
            <div className={styles.linearProgressWrapper}>{props.isLoading &&
                <LinearProgress className={styles.linearProgress}/>}
            </div>
            <header className={style.header}>
                <NavLink to="/profile">
                    <img
                        src={logo}
                        alt={'logo'}
                    />
                </NavLink>
                <div className={style.loginBlock}>
                    <div className={`${style.menu} ${showMenu && style.menuShow}`}
                         onClick={props.logout}>Log out
                    </div>
                    <div className={style.avatarWrapper}>
                        <img
                            id={'avatar'}
                            src={(props.ownerProfilePhoto && props.ownerProfilePhoto.large) || userPhoto}
                            className={style.avatar}
                            alt={'user'}
                            onClick={() => setShowMenu(!showMenu)}
                        />
                    </div>
                    <span className={style.login}>{props.login}</span>
                </div>
            </header>
        </>
    )
}
