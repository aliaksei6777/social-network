import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Friends} from "./components/Friends/Friends";
import {StoreType} from "./redux/state";
import Settings from "./components/Settings/Settings";

type AppTypes = {
    store: StoreType
}

const App: React.FC<AppTypes> = (props) => {

    return (
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <Friends dialogs={props.store._state.dialogPage.dialogs}/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/dialogs'} render={() => <Dialogs
                        store={props.store}
                    />}/>
                    <Route path={'/profile'} render={() => <Profile
                        posts={props.store._state.profilePage.posts}
                        newPostText={props.store._state.profilePage.newPostText}
                        dispatch={props.store.dispatch.bind(props.store)}
                    />}
                    />
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
    );
}

export default App;
