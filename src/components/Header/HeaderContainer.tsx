import React from 'react';
import s from './Header.module.css';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";
import {usersAPI} from "../../api/api";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type mapDispatchToPropsType = {
    setAuthUserData: (id: null | number,
                       email: null | string,
                       login: null | string) => void
}
export type AuthApiComponentsPropsType = MapStatePropsType & mapDispatchToPropsType


class HeaderContainer extends React.Component<AuthApiComponentsPropsType> {
    componentDidMount() {
        usersAPI.authMe().then(response => {
                if(response.resultCode === 0){
                    let {id, email, login} = response.data
                    this.props.setAuthUserData(id, email, login )
                }
            });
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
export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer);