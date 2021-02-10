import {stringify} from "querystring";
import {rerenderEntireTree} from "../render";
import {useState} from "react";



export type MessageType = {
    id: number
    message: string
}

export type DialogType = {
    id: number
    name: string
    ava: string
}

export type PostType = {
    id: number
    message: string
    likeCount: number
}

export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}


export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
}

let state = {
    profilePage: {
        posts : [
            {id: 1, message: "Hi how are you?", likeCount: 10},
            {id: 2, message: "It's my first post!", likeCount: 15},
            {id: 3, message: "It's my second post!", likeCount: 35},
        ],
        newPostText: 'it-kama'
    },
    dialogPage: {
        dialogs: [
            {id: 1, name: "nick1", ava: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'},
            {id: 2, name: "nick2", ava: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'},
            {id: 3, name: "nick3", ava: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}
        ],
        messages: [
            {id: 1, message: "Hello!"},
            {id: 2, message: "Hello!!"},
            {id: 3, message: "Hello!!"},
        ]
    },
}


export let addPost = () => {
    let newPost = {
        id: 4,
        message: state.profilePage.newPostText,
        likeCount: 0
    };
    state.profilePage.posts.push(newPost)
    updateNewPostText("")
    rerenderEntireTree(state)
}

export let updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);

}


export default state;