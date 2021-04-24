import React from 'react';
import {Header} from "./Header";
import {connect, ConnectedProps} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData} from "../../redux/auth-reducer";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
export type AuthApiComponentsPropsType = ConnectedProps<typeof connectAll>


class HeaderContainer extends React.Component<AuthApiComponentsPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }
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
const connectAll = connect(mapStateToProps,{getAuthUserData})

export default connectAll(HeaderContainer);