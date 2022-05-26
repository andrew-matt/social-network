import axios from "axios";

export const getUsers = (currentPage: number, pageSize: number) => {
    return (
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
            withCredentials: true
        })
            .then(response => response.data)
    )
}

export const unfollowUser = (userId: number) => {
    return (
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
            withCredentials: true,
            headers: {
                'API-KEY': '8d69feac-9319-4391-a8a4-a23d67360845'
            }
        })
            .then(response => response.data)
    )
}

export const followUser = (userId: number) => {
    return (
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {
            withCredentials: true,
            headers: {
                'API-KEY': '8d69feac-9319-4391-a8a4-a23d67360845'
            }
        })
            .then(response => response.data)
    )
}