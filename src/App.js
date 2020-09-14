import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import InventoryHome from './component/InventoryHome';
import SupplierView from './component/SupplierView';
import SupplierEdit from './component/SupplierEdit';
import { getSuppliers, getProducts } from './service/InventoryService';

const App = (props) => {
	const [content, setContent] = useState('inventory-home');
	const [suppliers, setSuppliers] = useState([]);
	const [products, setProducts] = useState([]);
	const [suppliersChanged, setSuppliersChanged] = useState(false);
	const [productsChanged, setProductsChanged] = useState(false);
	const [editingSupplier, setEditingSupplier] = useState(null);

	useEffect(() => {
		getSuppliers().then(res => {
			setSuppliers(res.data);
			setSuppliersChanged(false);
		});
	}, [suppliersChanged]);

	useEffect(() => {
		getProducts().then(res => {
			setProducts(res.data);
			setProductsChanged(true);
		});
	}, [productsChanged]);

	const handleContentChange = content => {
		setContent(content);
	};

	const handleSupplierEditing = id => {
		const supplier = suppliers.find(supplier => supplier.id === id);
		setEditingSupplier(supplier);
		setContent('supplier-edit');
	};

	const handleSupplierEdited = () => {
		setSuppliersChanged(true);
	};

	return (
		<Container>
			{content === 'inventory-home' && (<InventoryHome onContentChange={handleContentChange} />)}
			{content === 'supplier-view' && (<SupplierView onContentChange={handleContentChange} suppliers={suppliers} onEditClick={handleSupplierEditing} onDelete={handleSupplierEdited} />)}
			{content === 'supplier-edit' && (<SupplierEdit supplier={editingSupplier} onContentChange={handleContentChange} onUpdate={handleSupplierEdited} />)}
		</Container>);
}

export default App;