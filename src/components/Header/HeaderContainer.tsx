import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/Redux-Store";
import {getUserData, logout} from '../../Redux/Auth-reducer';

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string | null
    getUserData: () => void
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getUserData()
    }

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
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {getUserData, logout})(HeaderContainer);