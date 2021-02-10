import React from 'react';
import s from '../Friends.module.css';

type DialogItemTypes = {
    name: string
    id: number
    ava: string
};


export const Friend: React.FC<DialogItemTypes>  = (props) => {

    return (
        <div>
            <span><img src={props.ava}/></span>
            <span>{props.name}</span>
        </div>
    );
}