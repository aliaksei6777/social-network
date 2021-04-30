import React from 'react';
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../HOC/withAuthRedirect";

type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
}
type PathParamsType = {
    userId: string
}
type ProfilePropsType = MapDispatchToPropsType & MapStatePropsType
type PropsType = ProfilePropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId && this.props.myId) {
            userId = this.props.myId.toString()
        }
        this.props.getUserProfile(userId)
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
};


type MapStatePropsType = {
    profile: ProfileType | null
    myId: null | number
    // isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    myId: state.auth.id,
    // isAuth: state.auth.isAuth
})
const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default withAuthRedirect(connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent));