import React from 'react'
import {Navbar} from 'components/Navbar/Navbar'
import {Navigate, Route, Routes} from 'react-router-dom'
import {News} from 'components/News/News'
import {Music} from 'components/Music/Music'
import {Settings} from 'components/Settings/Settings'
import DialogsContainer from 'components/Dialogs/DialogsContainer'
import UsersContainer from 'components/Users/UsersContainer'
import ProfileContainer from 'components/Profile/profileContainer/ProfileContainer'
import HeaderContainer from 'components/Header/HeaderContainer'
import {connect} from 'react-redux'
import {AppRootStateType} from 'app/store'
import {initializeApp} from 'app/app-reducer'
import {Preloader} from 'components/common/Preloader/Preloader'
import style from 'app/App.module.css'
import Login from 'components/Login/Login'

type AppContainerPropsType = {
    initialized: boolean
    isAuth: boolean
    initializeApp: () => void
}

class App extends React.Component<AppContainerPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <div className={style.preloaderContainer}><Preloader/></div>
        }

        if (!this.props.isAuth) {
            return <Login/>
        }

        return (
            <div className={style.appWrapper}>
                <HeaderContainer/>
                <Navbar/>
                <div className={style.appWrapperContent}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login"/>}/>
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
        )
    }
}

type MapStateToPropsType = {
    initialized: boolean
    isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {initializeApp})(App)
