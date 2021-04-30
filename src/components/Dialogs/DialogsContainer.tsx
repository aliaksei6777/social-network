import React from 'react';
import {DialogsInitialStateType, sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import { Dispatch } from 'redux';
import {withAuthRedirect} from "../../HOC/withAuthRedirect";

type MapStatePropsType = {
    dialogPage: DialogsInitialStateType
}
type MapDispatchPropsType = {
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogPage: state.dialogPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageTextAC(text))
        },
        sendMessage: () => {dispatch(sendMessageAC())}
    }
}


export default withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs));

