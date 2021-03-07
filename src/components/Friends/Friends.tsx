import React from 'react';
import s from './Friends.module.css';
import {Friend} from "./Friend/Friend";
import {DialogType} from "../../redux/state";

type FriendsPageType = {
    dialogs: Array<DialogType>
}

export const Friends: React.FC<FriendsPageType>  = (props) => {
    let FriendElement = props.dialogs.map(d => <Friend name={d.name} id={d.id} ava={d.ava}/> );
    return (
        <div className={s.sidebar}>
            <div>
                <h3>Friends</h3>
                <div className={s.friend}>
                    {FriendElement}
                </div>
            </div>
        </div>
    );
}