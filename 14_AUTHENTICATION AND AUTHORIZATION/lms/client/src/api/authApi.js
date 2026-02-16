import axiosInstance from "./axiosInstance";

export const registerApi = async (userdata) => {
	const { data } = await axiosInstance.post("/auth/register", userdata);
	return data;
};

export const loginApi = async (userdata) => {
	const { data } = await axiosInstance.post("/auth/login", userdata);
	return data;
};
export const handleLogout = async () => {
	const { data } = await axiosInstance.post("/auth/logout");
	return data;
};


export const getCurrentUserApi = async () => {
	const { data } = await axiosInstance.get("/auth/profile");
	return data;
};

