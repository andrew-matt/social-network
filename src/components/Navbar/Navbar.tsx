import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/Profile' className={navData => navData.isActive ? s.activeLink : s.item}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/Dialogs' className={navData => navData.isActive ? s.activeLink : s.item}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/Users' className={navData => navData.isActive ? s.activeLink : s.item}>Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/News' className={navData => navData.isActive ? s.activeLink : s.item}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/Music' className={navData => navData.isActive ? s.activeLink : s.item}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/Settings' className={navData => navData.isActive ? s.activeLink : s.item}>Settings</NavLink>
        </div>
    </nav>
}

export default Navbar;