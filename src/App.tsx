import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Friends} from "./components/Friends/Friends";
import {RootStateType} from "./redux/state";

type AppTypes = {
    state: RootStateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

const App: React.FC<AppTypes> = (props) => {
    let dialogs = props.state.dialogPage.dialogs
    let messages = props.state.dialogPage.messages
    let posts = props.state.profilePage.posts
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <Friends dialogs={dialogs}/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/dialogs'} render={() => <Dialogs dialogs={dialogs} messages={messages}/>}/>
                    <Route path={'/profile'} render={() => <Profile
                        posts={posts}
                        addPost={props.addPost}
                        newPostText={props.state.profilePage.newPostText}
                        updateNewPostText={props.updateNewPostText}
                    />}
                    />
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
