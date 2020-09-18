import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import InventoryHome from './component/InventoryHome';
import SupplierView from './component/SupplierView';
import SupplierEdit from './component/SupplierEdit';
import SupplierAdd from './component/SupplierAdd';
import ProductView from './component/ProductView';
import ProductEdit from './component/ProductEdit';
import ProductAdd from './component/ProductAdd';
import {getProducts, getSuppliers, getTotalStockLevel} from './service/InventoryService';

const App = (props) => {
    const [content, setContent] = useState('inventory-home');
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [suppliersChanged, setSuppliersChanged] = useState(false);
    const [productsChanged, setProductsChanged] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [previousContentSupplierAdd, setPreviousContentSupplierAdd] = useState('inventory-home');
    const [previousContentProductAdd, setPreviousContentProductAdd] = useState('inventory-home');
    const [totalStockLevel, setTotalStockLevel] = useState(0);

    useEffect(() => {
        getSuppliers().then(res => {
            setSuppliers(res.data);
            setSuppliersChanged(false);
        });
    }, [suppliersChanged]);

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res.data);
            setProductsChanged(false);
        });
    }, [productsChanged]);

    useEffect(() => {
        getTotalStockLevel().then(res => {
            setTotalStockLevel(res.data.value);
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

    const handleProductEditing = id => {
        const product = products.find(product => product.id === id);
        setEditingProduct(product);
        setContent('product-edit');
    };

    const handleSupplierEdited = () => {
        setSuppliersChanged(true);
    };

    const handleProductEdited = () => {
        setProductsChanged(true);
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
            {content === 'supplier-view' && (<SupplierView onContentChange={handleContentChange} suppliers={suppliers}
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
                                                         products={products} onEditClick={handleProductEditing}
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