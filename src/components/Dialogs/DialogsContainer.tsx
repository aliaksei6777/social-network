import React, {ComponentType} from 'react';
import {DialogsInitialStateType, sendMessage} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";

type MapStatePropsType = {
    dialogPage: DialogsInitialStateType
}
type MapDispatchPropsType = {
    updateNewMessageText: (newMessageText: string) => void
    sendMessage: (newMessageText: string) => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogPage: state.dialogPage
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, {sendMessage}),
    withAuthRedirect
)(Dialogs)

