import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ba20e791-30f7-4ca9-a0a3-61abf10b8541',
    },
});

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId);
    },
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status});
    },
};

export const authAPI = {
    me() {
        return instance.get('auth/me');
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('auth/login', {email, password, rememberMe});
    },
    logout() {
        return instance.delete('auth/login');
    },
};