import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileApiComponentsPropsType} from "./ProfileContainer";

export const Profile = (props: ProfileApiComponentsPropsType) => {

    return (
        <div>
            {props.profile && <ProfileInfo profile={props.profile}/>}
            <MyPostsContainer/>
        </div>
    );
}