import React from 'react';
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect, ConnectedProps} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';


type MapStatePropsType = {
    profile: ProfileType | null
    myId: null | number
    isAuth: boolean
}
type PathParamsType = {
    userId: string
}
type ProfilePropsType = ConnectedProps<typeof connectAll>
export type ProfileApiComponentsPropsType = ProfilePropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<ProfileApiComponentsPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId && this.props.myId) {
            userId = this.props.myId.toString()
        }
        this.props.getUserProfile(userId)
    }
    render() {
        if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    myId: state.auth.id,
    isAuth: state.auth.isAuth
})
const connectAll = connect(mapStateToProps, {getUserProfile})
const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connectAll(WithUrlDataContainerComponent);