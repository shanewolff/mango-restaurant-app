import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import InventoryHome from './component/InventoryHome';
import SupplierView from './component/SupplierView';
import SupplierEdit from './component/SupplierEdit';
import SupplierAdd from './component/SupplierAdd';
import ProductView from './component/ProductView';
import ProductEdit from './component/ProductEdit';
import ProductAdd from './component/ProductAdd';
import API from './api';

const App = (props) => {
    const [content, setContent] = useState('inventory-home');
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [previousContentSupplierAdd, setPreviousContentSupplierAdd] = useState('inventory-home');
    const [previousContentProductAdd, setPreviousContentProductAdd] = useState('inventory-home');
    const [totalStockLevel, setTotalStockLevel] = useState(0);

    const fetchSupplierData = () => {
        API.get("/supplier").then(res => {
            setSuppliers(res.data);
        }).catch(err => {
            if (err.response) {
                console.log('Internal Server Error');
                alert('No supplier data have been fetched due to an internal server error!')
            } else if (err.request) {
                console.log('Network error or server is not responding');
                alert('Cannot fetch supplier data due to a network error or the service is unavailable!')
            }
        });
    };

    const fetchProductData = () => {
        API.get("/product")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                if (err.response) {
                    console.log('Internal Server Error');
                    alert('No product data have been fetched due to an internal server error!')
                } else if (err.request) {
                    console.log('Network error or server is not responding');
                    alert('Cannot fetch product data due to a network error or the service is unavailable!')
                }
            });
    }

    const fetchTotalStockLevel = () => {
        API.get("/stock-level").then(res => {
            setTotalStockLevel(res.data.value);
        }).catch(err => {
            if (err.response) {
                console.log('Internal Server Error');
                alert('Cannot fetch stock level due to an internal server error!')
            } else if (err.request) {
                console.log('Network error or server is not responding');
                alert('Cannot fetch stock level due to a network error or the service is unavailable!')
            }
        });
    };

    // Fetch supplier data
    useEffect(fetchSupplierData, []);

    // Fetch product data
    useEffect(fetchProductData, []);

    // Fetch total stock level
    useEffect(fetchTotalStockLevel, []);


    const handleContentChange = content => {
        if (content === 'supplier-view') {
            suppliers.length > 0 ? setContent(content) : alert('No suppliers have been fetched to show!');
        } else if (content === 'product-view') {
            products.length > 0 ? setContent(content) : alert('No products have been fetched to show!');
        } else if (content === 'product-add') {
            suppliers.length > 0 ? setContent(content) : alert('No suppliers have been found. Please add suppliers first to proceed with products.');
        } else {
            setContent(content);
        }

    };

    const handleSupplierEditing = id => {
        const supplier = suppliers.find(supplier => supplier.id === id);
        setEditingSupplier(supplier);
        setContent('supplier-edit');
    };

    const handleProductEditing = id => {
        const product = products.find(product => product.id === id);
        setEditingProduct(product);
        setContent('product-edit');
    };

    const handleSupplierEdited = () => {
        fetchSupplierData();
        fetchProductData();
    };

    const handleProductEdited = () => {
        fetchProductData();
        fetchTotalStockLevel();
    };

    const setPreviousContentForSupplierAdd = (content) => {
        setPreviousContentSupplierAdd(content);
    };

    const setPreviousContentForProductAdd = (content) => {
        setPreviousContentProductAdd(content);
    };

    return (
        <Container>
            {content === 'inventory-home' && (<InventoryHome onContentChange={handleContentChange}
                                                             setPreviousContentForSupplierAdd={setPreviousContentForSupplierAdd}
                                                             setPreviousContentForProductAdd={setPreviousContentForProductAdd}/>)}
            {content === 'supplier-view' && (
                <SupplierView onContentChange={handleContentChange} suppliers={suppliers}
                              onEditClick={handleSupplierEditing}
                              onDelete={handleSupplierEdited}
                              setPreviousContentForSupplierAdd={setPreviousContentForSupplierAdd}/>)}
            {content === 'supplier-edit' && (
                <SupplierEdit supplier={editingSupplier} onContentChange={handleContentChange}
                              onUpdate={handleSupplierEdited}/>)}
            {content === 'supplier-add' && (
                <SupplierAdd previousContent={previousContentSupplierAdd} onContentChange={handleContentChange}
                             onAdd={handleSupplierEdited}/>)}
            {content === 'product-view' && (<ProductView onContentChange={handleContentChange}
                                                         setPreviousContentForProductAdd={setPreviousContentForProductAdd}
                                                         products={products}
                                                         onEditClick={handleProductEditing}
                                                         totalStockLevel={totalStockLevel}
                                                         onDelete={handleProductEdited}/>)}
            {content === 'product-edit' && (<ProductEdit product={editingProduct} onContentChange={handleContentChange}
                                                         onUpdate={handleProductEdited} suppliers={suppliers}
                                                         totalStockLevel={totalStockLevel}/>)}
            {content === 'product-add' && (
                <ProductAdd previousContent={previousContentProductAdd} onContentChange={handleContentChange}
                            onAdd={handleProductEdited} suppliers={suppliers} totalStockLevel={totalStockLevel}/>)}
        </Container>);
}

export default App;
