import React, {ComponentType} from 'react';
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { compose } from 'redux';

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}
type PathParamsType = {
    userId: string
}
type ProfilePropsType = MapDispatchToPropsType & MapStatePropsType
type PropsType = ProfilePropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId
        if (!userId && this.props.authorizedUserId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
        />
    }
};


type MapStatePropsType = {
    profile: ProfileType | null
    authorizedUserId: null | number
    status: string
    isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    authorizedUserId: state.auth.id,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth
})

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}), withRouter)
(ProfileContainer)
