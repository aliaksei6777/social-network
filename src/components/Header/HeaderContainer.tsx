import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData, logout} from "../../redux/auth-reducer";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapsDispatchToProps = {
    logout: () => void
}
export type AuthApiComponentsPropsType = MapsDispatchToProps & MapStatePropsType


class HeaderContainer extends React.Component<AuthApiComponentsPropsType> {

    render () {
        return <Header {...this.props}/>
    };
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps,{getAuthUserData, logout})(HeaderContainer);