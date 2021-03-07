import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionTypes, PostType} from "../../redux/state";

export type PostAddPostType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: ActionTypes) => void
}

export const Profile: React.FC<PostAddPostType> = (props) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                newPostText={props.newPostText}
                dispatch={props.dispatch}
        />
        </div>
    );
}