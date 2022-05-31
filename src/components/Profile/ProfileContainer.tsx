import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {moveToProfilePage, UserProfileType} from "../../Redux/Profile-reducer";
import {ReduxStateType} from "../../Redux/Redux-Store";
import {useLocation, useNavigate, useParams} from "react-router-dom";

type ProfileContainerPropsType = {
    moveToProfilePage: (userId: number | string) => void
    profile: UserProfileType
    router: {
        params: {
            userId: string
        }
    }
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {

        let userId: number | string = this.props.router.params.userId

        if (!userId) {
            userId = 2;
        }

        this.props.moveToProfilePage(userId)
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
        profile: state.profilePage.profile
    }
}

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
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

export default connect(mapStateToProps, {moveToProfilePage})(withRouter(ProfileContainer));