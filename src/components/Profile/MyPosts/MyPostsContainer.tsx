import React from 'react';
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";

type MyPostsContainerPropsType = {
    store: any
}
const MyPostsContainer: React.FC<MyPostsContainerPropsType> = (props) => {
    
    const state = props.store.getState();
    const updateNewPostText = (text: string) => {
        props.store.dispatch(updateNewPostTextAC(text))
    }
    const addPost = () => {
        props.store.dispatch(addPostAC())
    };

    return (
        <MyPosts posts={state.profilePage.posts}
                 newPostText={state.profilePage.newPostText}
                 addPost={addPost}
                 updateNewPostText={updateNewPostText}/>
    );
}

export default MyPostsContainer