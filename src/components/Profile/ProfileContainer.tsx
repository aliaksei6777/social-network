import React from 'react';
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect, ConnectedProps} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';


type MapStatePropsType = {
    profile: ProfileType | null
    myId: null | number
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
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    myId: state.auth.id
})
const connectAll = connect(mapStateToProps, {getUserProfile})
const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connectAll(WithUrlDataContainerComponent);