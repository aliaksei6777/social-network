import React, {createRef} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostAddPostType} from "../Profile";


export const MyPosts: React.FC<PostAddPostType> = (props) => {


    let postsElements = props.posts.map(p => <Post message={p.message} id={p.id} likeCount={p.likeCount}/> );
    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        if (newPostElement.current) {
            props.addPost()
        }
    };
    let onPostChange = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.updateNewPostText(text);
        }
    }
    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <button onClick={addPost}>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}