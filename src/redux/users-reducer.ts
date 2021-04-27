import {usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";


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

export type UsersActionTypes = FollowActionType | UnfollowActionType | SetUsersActionType | setCurrentPageActionType
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

const usersReducer = (state: UsersInitialStateType = initialState, action: UsersActionTypes): UsersInitialStateType => {
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


export const getUsers = (currentPage: number, pageSize: number): AppThunk => async dispatch => {
    try {
        dispatch(toggleIsFetching(true))
        const res = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(res.items))
        dispatch(setTotalUsersCount(res.totalCount))
    } catch (e) {
        throw new Error(e)
    }
}

export const follow = (currentPage: number, pageSize: number, userId: number):AppThunk => async dispatch => {
    try {
        dispatch(toggleFollowingProgress(true, userId))
        const res = await usersAPI.follow(userId)
        if (res.resultCode === 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    } catch (e) {
        throw new Error(e)
    }
}

export const unFollow = (currentPage: number, pageSize: number, userId: number): AppThunk => async dispatch => {
    try {
        dispatch(toggleFollowingProgress(true, userId))
        const res = await usersAPI.unFollow(userId)
        if (res.resultCode === 0) {
            dispatch(unFollowSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    } catch (e) {
        throw new Error(e)
    }
}


// export const _getUsers = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {
//     dispatch(toggleIsFetching(true))
//     usersAPI.getUsers(currentPage, pageSize).then(data => {
//         dispatch(toggleIsFetching(false))
//         dispatch(setUsers(data.items))
//         dispatch(setTotalUsersCount(data.totalCount))
//     });
// }
// export const _follow = (currentPage: number, pageSize: number, userId: number):AppThunk => (dispatch) => {
//     dispatch(toggleFollowingProgress(true, userId))
//     usersAPI.follow(userId).then(data => {
//         if (data.resultCode === 0) {
//             dispatch(followSuccess(userId))
//         }
//         dispatch(toggleFollowingProgress(false, userId))
//     });
// }
// export const _unFollow = (currentPage: number, pageSize: number, userId: number): AppThunk => (dispatch) => {
//     dispatch(toggleFollowingProgress(true, userId))
//     usersAPI.unFollow(userId).then(data => {
//         if (data.resultCode === 0) {
//             dispatch(unFollowSuccess(userId))
//         }
//         dispatch(toggleFollowingProgress(false, userId))
//     });
// }


export default usersReducer;