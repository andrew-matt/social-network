import {NavLink, useParams} from 'react-router-dom'
import user_1 from 'assets/avatars/User_1.jpg'
import user_4 from 'assets/avatars/User_4.jpg'
import user_5 from 'assets/avatars/User_5.jpg'
import user_6 from 'assets/avatars/User_6.jpg'
import user_8 from 'assets/avatars/User_8.jpg'
import style from './DialogItemConversation.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const DialogItemConversation = () => {
    const params = useParams()

    let user
    let userName

    switch (params.userId) {
        case '1':
            user = user_1
            userName = 'Andrew'
            break
        case '2':
            user = user_8
            userName = 'Hannah'
            break
        case '3':
            user = user_4
            userName = 'William'
            break
        case '4':
            user = user_5
            userName = 'Jennifer'
            break
        case '5':
            user = user_6
            userName = 'Holly'
            break
        default:
            break
    }

    return (
        <div className={style.container}>
            <img src={user} alt="user" className={style.avatar}/>
            <span className={style.greetings}>{`Hi, I'm ${userName}!`}</span>
            <NavLink to="/dialogs">
                <div className={style.backLink}>
                    <FontAwesomeIcon icon={faArrowLeft} size={'lg'}/>
                    <span>back to messages</span>
                </div>
            </NavLink>
        </div>
    )
}