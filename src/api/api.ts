import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '8d69feac-9319-4391-a8a4-a23d67360845'
    },
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
        )
    },
    unfollow(userId: number) {
        return (
            instance.delete(`follow/${userId}`)
                .then(response => response.data)
        )
    },
    follow(userId: number) {
        return (
            instance.post(`follow/${userId}`)
                .then(response => response.data)
        )
    },
    getLogged() {
        return (
            instance.get('auth/me')
                .then(response => response.data)
        )
    }
}
