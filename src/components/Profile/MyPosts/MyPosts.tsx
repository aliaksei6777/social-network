import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export const  MyPosts: React.FC<MyPostsPropsType> = ({profilePage, addPostAC }) => {

    const postsElements = profilePage.posts.map(p => <Post key={p.id} message={p.message} id={p.id} likeCount={p.likeCount}/>);

    const addPostClick = (formData: PostsFormDataType) => {
        addPostAC(formData.newPostText)
    };

    return (
        <div className={s.postsBlock}>
            My post
            <AddPostFormRedux onSubmit={addPostClick}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}


type PostsFormDataType = {newPostText: string}

const AddNewPostForm:React.FC<InjectedFormProps<PostsFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <Field component="textarea" name="newPostText" placeholder="enter message"/>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<PostsFormDataType>({form: "profileAddNewPostForm"})(AddNewPostForm)