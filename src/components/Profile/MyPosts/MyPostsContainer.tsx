import {addPostAC, ProfileInitialStateType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from '../../../redux/redux-store';
import {connect} from "react-redux";

type MapStatePropsType = {
    profilePage: ProfileInitialStateType
}
type MapDispatchPropsType = {
    addPostAC: (newPostText: string) => void
}
export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPostAC})(MyPosts)

export default MyPostsContainer;