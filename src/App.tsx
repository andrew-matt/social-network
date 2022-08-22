import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {ReduxStateType} from './Redux/Redux-Store';
import {initializeApp} from './Redux/App-reducer';
import Preloader from './components/common/Preloader/Preloader';

type AppContainerPropsType = {
    initialized: boolean
    initializeApp: () => void
}

class App extends React.Component<AppContainerPropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>;
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login"/>}/>
                        <Route path="/profile/*" element={<ProfileContainer/>}/>
                        <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                        <Route path="/dialogs" element={<DialogsContainer/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

type MapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized,
    };
};

export default connect(mapStateToProps, {initializeApp})(App);
