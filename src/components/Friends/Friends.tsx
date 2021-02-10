import React from 'react';
import s from './Friends.module.css';
import {DialogItem} from "../Dialogs/DialogItem/DialogItem";
import {Friend} from "./Friend/Friend";

type DialogItemTypes = {
    name: string
    id: number
    ava: string
};

type FriendsPageType = {
    dialogs: Array<DialogItemTypes>
}

export const Friends: React.FC<FriendsPageType>  = (props) => {
    let dialogs = props.dialogs
    let FriendElement = dialogs.map(d => <Friend name={d.name} id={d.id} ava={d.ava}/> );
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