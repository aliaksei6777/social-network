import React from 'react';
import {NavLink} from 'react-router-dom';
import s from '../Dialogs.module.css';
import {DialogType} from "../../../redux/dialogs-reducer";

export const DialogItem: React.FC<DialogType> = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialogItems + ' ' + s.active}>
            <img src={props.ava}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
};
