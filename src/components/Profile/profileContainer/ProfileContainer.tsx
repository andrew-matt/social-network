import React, {ComponentType} from 'react';
import {Profile} from 'components/Profile/Profile';
import {connect} from 'react-redux';
import {
    getUserProfile,
    getStatus,
    UserProfileType,
    updateStatus,
    savePhoto,
    saveProfile,
} from 'components/Profile/profile-reducer';
import {AppRootStateType} from 'app/store';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {compose} from 'redux';
import {withAuthRedirect} from 'hoc/withAuthRedirect';

type ProfileContainerPropsType = {
    getUserProfile: (userId: number, isOwner?: boolean) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (formData: UserProfileType) => Promise<undefined>
    profile: UserProfileType
    router: {
        params: {
            userId: number
        }
    }
    isAuth: boolean
    status: string
    authorizedUserId: number | null
    isLoading: boolean
    ownerProfilePhoto: null | { small: string, large: string }
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId: number = this.props.router.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId !== null ? this.props.authorizedUserId : 23651;
            this.props.getUserProfile(userId, true);
        } else {
            this.props.getUserProfile(userId);
        }

        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile
                isOwner={!this.props.router.params.userId}
                profile={this.props.profile}
                status={this.props.status || '-----'}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
                isLoading={this.props.isLoading}
                ownerProfilePhoto={this.props.ownerProfilePhoto}
            />
        );
    }
}

type MapStateToPropsType = {
    profile: UserProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    isLoading: boolean
    ownerProfilePhoto: null | { small: string, large: string }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        isLoading: state.app.isLoading,
        ownerProfilePhoto: state.profilePage.ownerProfilePhoto,
    };
};

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
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);