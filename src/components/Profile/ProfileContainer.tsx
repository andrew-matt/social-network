import React, {ComponentType} from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, UserProfileType} from '../../Redux/Profile-reducer';
import {ReduxStateType} from '../../Redux/Redux-Store';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

type ProfileContainerPropsType = {
    getUserProfile: (userId: number | string) => void
    profile: UserProfileType
    router: {
        params: {
            userId: string
        }
    }
    isAuth: boolean
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {

        let userId: number | string = this.props.router.params.userId

        if (!userId) {
            userId = 2;
        }

        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

type MapStateToPropsType = {
    profile: UserProfileType | null
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
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

export default connect(mapStateToProps, {getUserProfile})(withRouter(withAuthRedirect(ProfileContainer)));