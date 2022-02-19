import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import {Profile, ProfilePropsType} from './components/Profile/Profile';
import {Dialogs, DialogsPropsType} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";

type AppPropsType = ProfilePropsType & DialogsPropsType

const App: React.FC<AppPropsType> = (props) => {

    return (
        <BrowserRouter>
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                <Route path='/profile' element={<Profile posts={props.posts}/>}/>
                <Route path='/dialogs' element={<Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/music' element={<Music/>}/>
                <Route path='/settings' element={<Settings/>}/>
                </Routes>
            </div>
        </div>
        </BrowserRouter>
    );
}

export default App;
