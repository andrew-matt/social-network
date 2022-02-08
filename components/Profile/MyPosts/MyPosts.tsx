import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

export type MyPostsPropsType = {
    message: string
    likecounts: string
}

const MyPosts = (props: MyPostsPropsType) => {
    debugger
    return <div className={s.content}>
    <div>
      my posts
      <div>
        new post
      </div>
      <div className={s.posts}>
        <Post message={"Hi, how are you?"} likecounts={"15 likes"}/>
        <Post message={"It's my first post!"} likecounts={"20 likes"}/>
      </div>
    </div>
  </div>
}

export default MyPosts;