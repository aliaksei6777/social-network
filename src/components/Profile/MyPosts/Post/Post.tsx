import React from 'react';
import s from './Post.module.css';
import {PostType} from "../../../../redux/profile-reducer";

export const Post: React.FC<PostType> = (props) => {
    return (
        <div>
            <div className={s.item}>
                <img src={'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}/>
                {props.message}
                <div>
                    <span>like </span>{props.likeCount}
                </div>
            </div>
        </div>
    );
}