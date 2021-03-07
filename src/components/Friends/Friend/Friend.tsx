import React from 'react';
import s from '../Friends.module.css';
import {DialogType} from "../../../redux/state";



export const Friend: React.FC<DialogType>  = (props) => {

    return (
        <div>
            <span><img src={props.ava}/></span>
            <span>{props.name}</span>
        </div>
    );
}