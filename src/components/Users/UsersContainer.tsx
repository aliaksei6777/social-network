import React, {ComponentType} from 'react'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setCurrentPage, UserType, toggleFollowingProgress, requestUsers, follow, unFollow} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type MapsDispatchToProps = {
    setCurrentPage: (currentPage: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (currentPage: number, pageSize: number, userId: number) => void
    unFollow: (currentPage: number, pageSize: number, userId: number) => void
}
type PropsType = MapStatePropsType & MapsDispatchToProps

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
        this.props.setCurrentPage(pageNumber)
    }
    render() {
        return <>
            <div>
                {this.props.isFetching ? <Preloader/> : null}
            </div>
            <Users users={this.props.users}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, {setCurrentPage, toggleFollowingProgress, getUsers: requestUsers, follow, unFollow}),
    withAuthRedirect
)(UsersContainer)
