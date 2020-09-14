import axios from "axios";

const BASE_URL = 'http://localhost:8080/inventory';

const getSuppliers = () => {
	return axios.get(`${BASE_URL}/supplier`);
};

const updateSupplier = (id, data) => {
	return axios.patch(`${BASE_URL}/supplier/${id}`, data);
}

const deleteSupplier = id => {
	return axios.delete(`${BASE_URL}/supplier/${id}`);
}

const getProducts = () => {
	return axios.get(`${BASE_URL}/product`);
};



export { getSuppliers, getProducts, updateSupplier, deleteSupplier };