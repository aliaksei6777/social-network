import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatus from "./ProfileStatus";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}


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
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    );
}