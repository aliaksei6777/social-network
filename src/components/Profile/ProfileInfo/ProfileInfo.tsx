import React from 'react';
import s from './ProfileInfo.module.css';

export const ProfileInfo = () => {
    return (
        <div>
            <div className={s.imgBackground}>
                <img src="https://html5css.ru/css/img_forest.jpg" alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                ava+description
            </div>
        </div>
    );
}