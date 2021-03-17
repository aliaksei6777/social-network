import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Route} from 'react-router-dom';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Friends} from "./components/Friends/Friends";
import Settings from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";

type AppTypes = {
    store: any
}

const App: React.FC<AppTypes> = (props) => {

    return (
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <Friends dialogs={props.store.getState().dialogPage.dialogs}/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/dialogs'} render={() => <DialogsContainer
                        store={props.store}
                    />}/>
                    <Route path={'/profile'} render={() => <Profile
                        store={props.store}
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
