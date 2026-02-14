import axiosInstance from "./axiosInstance";

export const addToCartApi = async (courseId) => {
    
    const { data } = await axiosInstance.post("/cart", { courseId });
    console.log(data);
	return data;
};

export const getCartItems = async () => {
	const { data } = await axiosInstance.get("/cart",);
	return data.finalCartItemsData;
};

export const removeFromCart = async (courseId) => {
	const { data } = await axiosInstance.delete(`/cart/${courseId}`);
	console.log(data)
};
