import axios from "axios";


export type ItemType = {
    'name': string
    'id': number
    'uniqueUrlName': null | string
    'photos': {
        'small': null | string
        'large': null | string
    },
    'status': null | string
    'followed': boolean
}
export type ServerData = {
    'items': ItemType[]
    'totalCount': number
    'error': null | string
}
type CommonResponseType = {
    data: ServerData
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "3968e2e7-ef1b-4e58-9108-d41e4dea47f4"
    }
})

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get<ServerData>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response: CommonResponseType) => response.data)
    },
    unFollow (userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    follow (userId: number) {
        return instance.post(`follow/${userId}`).then(response => response.data)
    },
    getProfileUser (userId: string) {
        return instance.get(`profile/` + userId).then(response => response.data)
    }
}


export const authAPI = {
    me () {
        return instance.get("auth/me").then(response => response.data)
    },
}