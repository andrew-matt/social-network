import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from 'app/store';
import {logout} from 'app/auth/auth-reducer';
import {UserProfileType} from 'components/Profile/profile-reducer'

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
    profile: UserProfileType | null
    isLoading: boolean
    ownerProfilePhoto: null | { small: string, large: string },
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <Header
                {...this.props}
            />
        )
    }
}

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
    profile: UserProfileType | null
    isLoading: boolean
    ownerProfilePhoto: null | { small: string, large: string },
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        profile: state.profilePage.profile,
        isLoading: state.app.isLoading,
        ownerProfilePhoto: state.profilePage.ownerProfilePhoto,
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);