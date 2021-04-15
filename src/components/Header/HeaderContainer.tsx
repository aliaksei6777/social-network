import React from 'react';
import s from './Header.module.css';
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";

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
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
            withCredentials: true
        })
            .then(response => {
                if(response.data.resultCode === 0){
                    let {id, email, login} = response.data.data
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