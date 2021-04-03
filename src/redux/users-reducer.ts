
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

export const followAC = (userId: number) => {
    return {
        type: FOLLOW,
        userId
    } as const
}
export const unfollowAC = (userId: number) => ({
    type: UNFOLLOW,
    userId
}) as const
export const setUsersAC = (users: Array<UserType>) => ({
    type: SET_USERS,
    users
}) as const

export type FollowActionType = ReturnType<typeof followAC>
export type UnfollowActionType = ReturnType<typeof unfollowAC>
export type SetUsersActionType = ReturnType<typeof setUsersAC>

type ActionTypes = FollowActionType | UnfollowActionType | SetUsersActionType
type LocationType =  {
    city: string
    country: string
}
export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
export type UsersInitialStateType = {
    users: Array<UserType>
}

const initialState: UsersInitialStateType = {
    users: []
}

const usersReducer = (state: UsersInitialStateType = initialState, action: ActionTypes): UsersInitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state;
    }
}

export default usersReducer;