import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";
import state, {addMessage, addPost, updateNewMessageText, updateNewPostText} from "./Redux/State";

test('renders learn react link', () => {
  render(<App state={state} addPost={addPost} updateNewPostText={updateNewPostText} addMessage={addMessage} updateNewMessageText={updateNewMessageText}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
