import axios from "axios";

const BASE_URL = 'http://localhost:8080/inventory';

const getSuppliers = () => {
	return axios.get(`${BASE_URL}/supplier`);
};

const addSupplier = (data) => {
	return axios.post(`${BASE_URL}/supplier`, data);
}

const updateSupplier = (id, data) => {
	return axios.patch(`${BASE_URL}/supplier/${id}`, data);
}

const deleteSupplier = id => {
	return axios.delete(`${BASE_URL}/supplier/${id}`);
}

const getProducts = () => {
	return axios.get(`${BASE_URL}/product`);
};

const updateProduct = (id, data) => {
	return axios.patch(`${BASE_URL}/product/${id}`, data);
}

const addProduct = (data) => {
	return axios.post(`${BASE_URL}/product`, data);
}

const deleteProduct = id => {
	return axios.delete(`${BASE_URL}/product/${id}`);
}

const getTotalStockLevel = () => {
	return axios.get(`${BASE_URL}/stock-level`);
}

export {
	getSuppliers,
	getProducts,
	updateSupplier,
	deleteSupplier,
	addSupplier,
	getTotalStockLevel,
	updateProduct,
	addProduct,
	deleteProduct
};