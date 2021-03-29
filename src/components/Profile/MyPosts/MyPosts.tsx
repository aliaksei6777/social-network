import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";

export const  MyPosts: React.FC<MyPostsPropsType> = ({profilePage, updateNewPostText, addPost }) => {

    const postsElements = profilePage.posts.map(p => <Post key={p.id} message={p.message} id={p.id} likeCount={p.likeCount}/>);
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            addPostClick()
        }
    }
    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewPostText(e.currentTarget.value)
    }
    const addPostClick = () => {
        addPost()
    };

    return (
        <div className={s.postsBlock}>
            My post
            <div>
                <textarea value={profilePage.newPostText}
                          onChange={newTextChangeHandler}
                          onKeyPress={onKeyPressHandler}
                />
                <div>
                    <button onClick={addPostClick}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}