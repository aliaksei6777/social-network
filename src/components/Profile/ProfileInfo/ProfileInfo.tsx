import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";

type PropsType = {profile: ProfileType}


export const ProfileInfo = (props: PropsType) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.imgBackground}>
                <img src="https://html5css.ru/css/img_forest.jpg" alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large ? props.profile.photos.large : ""}/>
                <div>
                    {props.profile.fullName}<br/>
                    {props.profile.aboutMe}<br/>
                    contacts:<br/>
                    <a href={props.profile.contacts.facebook ? props.profile.contacts.facebook : ""}>facebook</a><br/>
                    <a href={props.profile.contacts.website ? props.profile.contacts.website : ""}>website</a><br/>
                    <a href={props.profile.contacts.github ? props.profile.contacts.github : ""}>github</a>
                </div>
            </div>
        </div>
    );
}