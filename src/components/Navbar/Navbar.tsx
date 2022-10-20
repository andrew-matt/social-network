import React from 'react'
import {NavLink} from 'react-router-dom'
import style from './Navbar.module.css'
import {
    faUser,
    faComment,
    faUserGroup,
    faNewspaper,
    faMusic,
    faGear,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const Navbar = () => {
    return (
        <div className={style.block}>
            <nav className={style.nav}>
                <NavLink to="/profile"
                         className={navData => `${style.item} ${navData.isActive && style.activeLink}`}>
                    <FontAwesomeIcon icon={faUser}/>
                    <span>Profile</span>
                </NavLink>
                <NavLink to="/dialogs"
                         className={navData => `${style.item} ${navData.isActive && style.activeLink}`}>
                    <FontAwesomeIcon icon={faComment}/>
                    <span>Messages</span>
                </NavLink>
                <NavLink to="/users"
                         className={navData => `${style.item} ${navData.isActive && style.activeLink}`}>
                    <FontAwesomeIcon icon={faUserGroup}/>
                    <span>Users</span>
                </NavLink>
                <NavLink to="/news"
                         className={navData => `${style.item} ${navData.isActive && style.activeLink}`}>
                    <FontAwesomeIcon icon={faNewspaper}/>
                    <span>News</span>
                </NavLink>
                <NavLink to="/music"
                         className={navData => `${style.item} ${navData.isActive && style.activeLink}`}>
                    <FontAwesomeIcon icon={faMusic}/>
                    <span>Music</span>
                </NavLink>
                <NavLink to="/settings"
                         className={navData => `${style.item} ${navData.isActive && style.activeLink}`}>
                    <FontAwesomeIcon icon={faGear}/>
                    <span>Settings</span>
                </NavLink>
            </nav>
        </div>
    )
}
