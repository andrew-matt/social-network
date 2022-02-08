import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return <div className={s.content}>
    <div>
    <img src='https://www.culture.ru/storage/images/bab1ddcc0713875c174b044b475d0fee/4feb4a73ea13139d24b5dedfae4637e7.jpeg'/>
    </div>
    <div>
      ava + description
    </div>
        <MyPosts hey={'yo!'}/>
  </div>
}

export default Profile;