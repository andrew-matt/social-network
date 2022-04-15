import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {ActionTypes, RootStateType} from "./Redux/Store";
import {ReduxStoreType} from "./Redux/Redux-Store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

export type AppPropsType = {
    store: ReduxStoreType
    state: RootStateType
    dispatch: (action: ActionTypes) => void
}

const App: React.FC<AppPropsType> = (props) => {

    debugger;
    return (
        <BrowserRouter>
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                <Route path='/profile' element={<Profile store={props.store}/>}/>
                <Route path='/dialogs' element={<DialogsContainer store={props.store}/>}/>
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
