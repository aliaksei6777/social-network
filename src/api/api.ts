import axios from "axios";


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
            .then(response => response.data)
    },
    unFollowUser (userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    followUser (userId: number) {
        return instance.post(`follow/${userId}`).then(response => response.data)
    },
    authMe () {
        return instance.get("auth/me").then(response => response.data)
    },
    getProfileUser (userId: string) {
        return instance.get(`profile/` + userId).then(response => response.data)
    }
}

