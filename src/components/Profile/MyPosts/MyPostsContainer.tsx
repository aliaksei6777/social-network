import {addPostAC, ProfileInitialStateType, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from '../../../redux/redux-store';
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStatePropsType = {
    profilePage: ProfileInitialStateType
}
type MapDispatchPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}
export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewPostText: (text: string) => dispatch(updateNewPostTextAC(text)),
        addPost: () => dispatch(addPostAC())
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;