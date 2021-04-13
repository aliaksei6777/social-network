import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/avatar.png";
import {UserType} from "../../redux/users-reducer";
import { NavLink } from "react-router-dom";

type UsersPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

const Users: React.FC<UsersPropsType> = ({
                                             users, totalUsersCount, pageSize,
                                             currentPage, onPageChanged,
                                             follow, unFollow
                                         }) => {

    const pagesCount = Math.ceil((totalUsersCount) / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {pages.push(i);}

    return <div>
        <div>
            {pages.map(p => {
                return <span key={p}
                             className={currentPage === p ? styles.selectedPage : ""}
                             onClick={() => {onPageChanged(p)}}>{p + " "}</span>})}
        </div>
        {
            users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => unFollow(u.id)}>Unfollow</button>
                            : <button onClick={() => follow(u.id)}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users