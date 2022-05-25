import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setUserData} from "../../Redux/Auth-reducer";
import {ReduxStateType} from "../../Redux/Redux-Store";

type HeaderContainerPropsType = {
    setUserData: (userId: number, email: string, login: string) => void
    isAuth: boolean
    login: string | null
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setUserData(id, email, login)
                }
            })
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

export default connect(mapStateToProps, {setUserData})(HeaderContainer);