import {Navigate} from 'react-router-dom';
import React, {ComponentType} from 'react';
import {AppRootStateType} from 'Redux/Store';
import {connect} from 'react-redux';

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppRootStateType): MapStateToPropsForRedirectType => {
    return {
        isAuth: state.auth.isAuth,
    };
};

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    class RedirectComponent extends React.Component<MapStateToPropsForRedirectType> {
        render() {
            let {isAuth, ...restProps} = this.props;
            if (!isAuth) return <Navigate to={'/login'}/>;
            return <Component {...restProps as T}/>;
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}