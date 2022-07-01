import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Vanamo_Logo.svg/1200px-Vanamo_Logo.svg.png"
            />
            <div className={s.loginBlock}>
                {
                    props.isAuth
                        ? (
                            <div>
                                {props.login} - <button onClick={props.logout}>Log out</button>
                            </div>
                        )
                        : <NavLink to="/Login">Login</NavLink>
                }
            </div>
        </header>
    );
};

export default Header;