import axiosClient from './axiosClient';

const userApi = {
   
    getUserInfo() {
        return axiosClient.get('/user/');
    },


    updateProfile(data) {
        return axiosClient.put('/update-profile/', data);
    },

    updateAvatar(avatarBase64) {
        return axiosClient.put('/update-avatar/', { avatar: avatarBase64 });
    },
};

export default userApi;
