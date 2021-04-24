import {usersAPI} from "../api/api";
import {Dispatch} from "redux";


enum USERS_ACTIONS {
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    SET_USERS = 'SET-USERS',
    SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
    SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS_COUNT',
    TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS',
}

export type FollowActionType = ReturnType<typeof followSuccess>
export type UnfollowActionType = ReturnType<typeof unFollowSuccess>
export type SetUsersActionType = ReturnType<typeof setUsers>
export type setCurrentPageActionType = ReturnType<typeof setCurrentPage>
export type setTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
export type setIsFetchingActionType = ReturnType<typeof toggleIsFetching>
export type toggleFollowingProgressActionType = ReturnType<typeof toggleFollowingProgress>

type ActionTypes = FollowActionType | UnfollowActionType | SetUsersActionType | setCurrentPageActionType
    | setTotalUsersCountActionType | setIsFetchingActionType | toggleFollowingProgressActionType

type LocationType = {
    city: string
    country: string
}
export type UserType = {
    id: number
    photos: { [key: string]: string | null }
    followed: boolean
    name: string
    status: string | null
    location?: LocationType
}
export type UsersInitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]

}

const initialState: UsersInitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state: UsersInitialStateType = initialState, action: ActionTypes): UsersInitialStateType => {
    switch (action.type) {
        case USERS_ACTIONS.FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        }
        case USERS_ACTIONS.UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        }
        case USERS_ACTIONS.SET_USERS: {
            return {...state, users: action.users}
        }
        case USERS_ACTIONS.SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case USERS_ACTIONS.SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case USERS_ACTIONS.TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case USERS_ACTIONS.TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId: number) => ({type: USERS_ACTIONS.FOLLOW, userId} as const)
export const unFollowSuccess = (userId: number) => ({type: USERS_ACTIONS.UNFOLLOW, userId} as const)
export const setUsers = (users: Array<UserType>) => ({type: USERS_ACTIONS.SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: USERS_ACTIONS.SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: USERS_ACTIONS.SET_TOTAL_USERS_COUNT, totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: USERS_ACTIONS.TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
    ({type: USERS_ACTIONS.TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)


export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize).then(data => {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    });
}

export const follow = (currentPage: number, pageSize: number, userId: number) => (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.follow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    });
}
export const unFollow = (currentPage: number, pageSize: number, userId: number) => (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.unFollow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(unFollowSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    });
}




export default usersReducer;