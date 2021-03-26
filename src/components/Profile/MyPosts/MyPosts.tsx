import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const postsElements = props.profilePage.posts.map(p => <Post message={p.message} id={p.id} likeCount={p.likeCount}/>);
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            addPost()
        }
    }
    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }
    const addPost = () => {
        props.addPost()
    };

    return (
        <div className={s.postsBlock}>
            My post
            <div>
                <textarea value={props.profilePage.newPostText}
                          onChange={newTextChangeHandler}
                          onKeyPress={onKeyPressHandler}
                />
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}