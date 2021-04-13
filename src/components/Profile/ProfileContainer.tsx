import React from 'react';

import {Profile} from "./Profile";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter } from 'react-router-dom';

type MapStatePropsType = {
    profile: ProfileType | null
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
        if (!userId) {userId = "2"}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render () {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})


const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);