import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {usersAPI} from "../../api/api";


type MapStatePropsType = {
    profile: ProfileType | null
    myId: null | number
}
type mapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}
type PathParamsType = {
    userId: string
}
export type ProfileApiComponentsPropsType = MapStatePropsType & mapDispatchToPropsType
    & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<ProfileApiComponentsPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId && this.props.myId) {
            userId = this.props.myId.toString()
        }
        usersAPI.getProfileUser(userId).then(data => {
                    this.props.setUserProfile(data)
                }
            );
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
const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);