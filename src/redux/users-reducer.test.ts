import usersReducer, {
    followAC,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersInitialStateType,
    UserType
} from "./users-reducer";

let initialState: UsersInitialStateType

beforeEach(() => {
    initialState = {
        users: [{
            "name": "user1",
            "id": 1,
            "photos": {
                ["small"]: null
            },
            "status": null,
            "followed": false
        },
            {
                "name": "user2",
                "id": 2,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": null,
                "followed": true
            },
            {
                "name": "user3",
                "id": 3,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": "asd",
                "followed": false
            },
            {
                "name": "user4",
                "id": 4,
                "photos": {
                    "small": null,
                    "large": null
                },
                "status": null,
                "followed": false
            }],
        pageSize: 5,
        totalUsersCount: 21,
        currentPage: 2
    }
})

test('user should be followed', () => {

    const endState = usersReducer(initialState, followAC(4))

    expect(endState.users[3].followed).toBe(true)
    expect(endState.users[0].followed).toBe(false)
})

test('user should be unfollowed', () => {

    const endState = usersReducer(initialState, unfollowAC(2))

    expect(endState.users[1].followed).toBe(false)
    expect(endState.users[0].followed).toBe(false)
})

test('correct array of users should be added', () => {

    const newUsers: Array<UserType> = [
        {
            "name": "newUser1",
            "id": 1,
            "photos": {
                ["small"]: null
            },
            "status": null,
            "followed": false
        },
        {
            "name": "newUser2",
            "id": 2,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": true
        },
        {
            "name": "newUser3",
            "id": 3,
            "photos": {
                "small": null,
                "large": null
            },
            "status": "asd",
            "followed": false
        },
        {
            "name": "newUser4",
            "id": 4,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": false
        }]

    const endState = usersReducer(initialState, setUsersAC(newUsers))

    expect(endState.users[0].name).toBe('newUser1')
    expect(endState.users[3].name).toBe('newUser4')

})

test('property page should setted to current page', () => {

    const endState = usersReducer(initialState, setCurrentPageAC(10))

    expect(endState.currentPage).toBe(10)
    expect(endState.pageSize).toBe(5)
    expect(endState.totalUsersCount).toBe(21)
})

test('property total users count should setted', () => {

    const endState = usersReducer(initialState, setTotalUsersCountAC(50))

    expect(endState.currentPage).toBe(2)
    expect(endState.pageSize).toBe(5)
    expect(endState.totalUsersCount).toBe(50)
})



