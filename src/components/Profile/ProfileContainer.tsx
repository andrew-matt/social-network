import React, {ComponentType} from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getStatus, UserProfileType, updateStatus} from '../../Redux/Profile-reducer';
import {ReduxStateType} from '../../Redux/Redux-Store';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {compose} from 'redux';

type ProfileContainerPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    profile: UserProfileType
    router: {
        params: {
            userId: number
        }
    }
    isAuth: boolean
    status: string
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {

        let userId: number = this.props.router.params.userId

        if (!userId) {
            userId = 2;
        }

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}

type MapStateToPropsType = {
    profile: UserProfileType | null
    status: string
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
}

function withRouter<T>(Component: ComponentType<T>) {
    function ComponentWithRouterProp(props: T) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer)