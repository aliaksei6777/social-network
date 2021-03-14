import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostAddPostType} from "../Profile";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";


export const MyPosts: React.FC<PostAddPostType> = (props) => {

    const postsElements = props.posts.map(p => <Post message={p.message} id={p.id} likeCount={p.likeCount}/>);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {if (e.key === "Enter") {addPost()} }
    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // props.dispatch({type: "UPDATE-NEW-POST-TEXT", newText: e.currentTarget.value})
        props.dispatch(updateNewPostTextAC(e.currentTarget.value))
    }
    const addPost = () => {
        // props.dispatch({type: "ADD-POST"})
        props.dispatch(addPostAC())
    };


    return (
        <div className={s.postsBlock}>
            My post
            <div>
                <textarea onChange={newTextChangeHandler} onKeyPress={onKeyPressHandler}  value={props.newPostText}/>
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