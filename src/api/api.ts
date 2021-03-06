import axios from "axios";
import {ProfileType} from "../redux/profile-reducer";

export type ItemType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: {
        small: null | string
        large: null | string
    },
    status: null | string
    followed: boolean
}
export type GetItemsType = {
    items: ItemType[]
    totalCount: number
    error: null | string
}
type AuthDataType = {
    id: number
    email: string
    login: string
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
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
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data as GetItemsType)
    },
    unFollow (userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    follow (userId: number) {
        return instance.post(`follow/${userId}`).then(response => response.data)
    },
    getProfileUser (userId: number) {
        console.warn('Obsolete method. Please use profile API object')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile (userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => response.data)
    },
    getStatus (userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data)
    },
    updateStatus (status: string){
        return instance.put<ResponseType>(`profile/status`, {status: status})
    }
}


export const authAPI = {
    me () {
        return instance.get<ResponseType<AuthDataType>>("auth/me")
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<ResponseType<{userId: number}>>("auth/login",{email,password,rememberMe})
    },
    logout(){
        return instance.delete<ResponseType>("auth/login")
    }
}