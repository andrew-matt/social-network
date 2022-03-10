import React from "react";
import {rerenderEntireTree} from "../render";

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}

let state = {
    profilePage: {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 15},
            {id: 2, message: "It's my first post!", likesCount: 20}
        ],
        newPostText: ''
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: "Andrew"},
            {id: 2, name: "Hannah"},
            {id: 3, name: "William"},
            {id: 4, name: "Jennifer"},
            {id: 5, name: "Holly"}
        ],
        messages: [
            {id: 1, message: "Hi"},
            {id: 2, message: "How are you"},
            {id: 3, message: "Hell yeah"}
        ],
        newMessageText: ''
    }
}

export let addPost = () => {
    let newPost: PostType = {
        id: 3,
        message: state.profilePage.newPostText,
        likesCount: 4
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}
export let updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}
export let addMessage = () => {
    let newMessage: MessageType = {
        id: 4,
        message: state.dialogsPage.newMessageText,
    }
    state.dialogsPage.messages.push(newMessage)
    state.dialogsPage.newMessageText = ''
    rerenderEntireTree(state)
}
export let updateNewMessageText = (newText: string) => {
    state.dialogsPage.newMessageText = newText
    rerenderEntireTree(state)
}

export default state;
