import axiosInstance from "../../configs/axios";

const userService = {
    update: async (id, data) => {
        const res = await axiosInstance.put(`/user/${id}/PersonalInformation`, data);
        return res.data;
    }
};

export default userService;