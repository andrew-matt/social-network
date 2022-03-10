import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addMessage, addPost, RootStateType, updateNewMessageText, updateNewPostText} from "./Redux/State";

export function rerenderEntireTree(state: RootStateType) {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} addMessage={addMessage} updateNewMessageText={updateNewMessageText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
