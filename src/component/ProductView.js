import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {PencilFill, PlusCircleFill, TrashFill} from 'react-bootstrap-icons';
import './ProductView.css';
import API from '../api';

const ProductView = (props) => {
    const [products, setProducts] = useState(props.products);
    const [searchName, setSearchName] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [searchSupplier, setSearchSupplier] = useState('');
    const [nameIncluded, setNameIncluded] = useState(false);
    const [categoryIncluded, setCategoryIncluded] = useState(false);
    const [supplierIncluded, setSupplierIncluded] = useState(false);

    useEffect(() => {
        setProducts(props.products);
    }, [props]);

    const handleDelete = id => {
        if (window.confirm("Do you want to delete the selected product?")) {
            API.delete(`/product/${id}`)
                .then(res => {
                    window.alert("The selected product has been deleted");
                    props.onDelete();
                })
                .catch(err => {
                    if (err.response) {
                        console.log('Internal Server Error');
                        alert('Product could not be deleted due to an internal server error!')
                    } else if (err.request) {
                        console.log('Network error or server is not responding');
                        alert('Cannot delete the product data due to a network error or the service is unavailable!')
                    }
                });
        }
    }

    const handleProductSearch = () => {
        const searchCriteria = {};
        if (nameIncluded && searchName !== '') {
            searchCriteria.name = searchName;
        }
        if (categoryIncluded && searchCategory !== '') {
            searchCriteria.category = searchCategory;
        }
        if (supplierIncluded && searchSupplier !== '') {
            searchCriteria.supplier = searchSupplier;
        }
        if (Object.keys(searchCriteria).length > 0) {
            API.get(`/product/search`, {params: searchCriteria})
                .then(res => {
                    if (res.data.length > 0) {
                        setProducts(res.data);
                    } else {
                        alert('No matching product found for the given search criteria! Search something else.');
                    }
                })
                .catch(err => {
                    if (err.response) {
                        console.log('Internal Server Error');
                        alert('Product search cannot be performed due to an internal server error!')
                    } else if (err.request) {
                        console.log('Network error or server is not responding');
                        alert('Cannot perform the product search due to a network error or the service is unavailable!')
                    }
                });
        } else {
            alert('Incomplete search criteria. Check the inputs and search again.')
        }
    };


    const tableRows = products.map(product =>
        <tr key={product.id}>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>{product.supplierName}</td>
            <td>{product.quantity}</td>
            <td>{product.stockLevel}</td>
            <td>
                <div className='btn-group-sm'>
                    <Button className='btn-warning' onClick={() => {
                        props.onEditClick(product.id)
                    }}>
                        <PencilFill/>
                    </Button>
                    <Button className='btn-danger' onClick={() => handleDelete(product.id)}>
                        <TrashFill/>
                    </Button>
                </div>
            </td>
        </tr>
    );

    const getProgressBarClasses = () => {
        const progressBarClasses = ['progress-bar', 'progress-bar-striped', 'progress-bar-animated'];
        if (props.totalStockLevel <= 25) {
            progressBarClasses.push('bg-success');
        } else if (props.totalStockLevel <= 50) {
            progressBarClasses.push('bg-info');
        } else if (props.totalStockLevel <= 75) {
            progressBarClasses.push('bg-warning');
        } else if (props.totalStockLevel > 75) {
            progressBarClasses.push('bg-danger');
        }

        return progressBarClasses.join(' ');
    };

    return (
        <React.Fragment>
            <Row>
                <Col className="text-center">
                    <h1 className="display-4">PRODUCT INVENTORY</h1>
                    <br/>
                </Col>
            </Row>
            <Card body className='shadow mb-4'>
                <Card.Title>Product Inventory Search</Card.Title>
                <Row>
                    <Col>
                        <label>Product Name</label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox checked={nameIncluded} onChange={event => {
                                    setNameIncluded(event.target.checked)
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl value={searchName} onChange={event => {
                                setSearchName(event.target.value)
                            }} disabled={!nameIncluded}/>
                        </InputGroup>
                    </Col>
                    <Col>
                        <label>Product Category</label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox checked={categoryIncluded} onChange={event => {
                                    setCategoryIncluded(event.target.checked)
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl value={searchCategory} onChange={event => {
                                setSearchCategory(event.target.value)
                            }} disabled={!categoryIncluded}/>
                        </InputGroup>
                    </Col>
                    <Col>
                        <label>Supplier Name</label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox checked={supplierIncluded} onChange={event => {
                                    setSupplierIncluded(event.target.checked)
                                }}/>
                            </InputGroup.Prepend>
                            <FormControl value={searchSupplier} onChange={event => {
                                setSearchSupplier(event.target.value)
                            }} disabled={!supplierIncluded}/>
                        </InputGroup>
                    </Col>
                    <Col xs='auto'>
                        <Button style={{marginTop: '2rem'}} onClick={handleProductSearch}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <Form.Text className="text-muted mt-0">
                    Select any of the 3 fields to search products which matches text queries.
                </Form.Text>
            </Card>
            <Row>
                <Col>
                    <div className="progress" style={{height: '2.5rem'}}>
                        <div className={getProgressBarClasses()} role="progressbar"
                             aria-valuenow={props.totalStockLevel} aria-valuemin="0" aria-valuemax="100"
                             style={{width: `${props.totalStockLevel}%`}}>
                            <div className='progress-bar-text' style={{fontSize: '1rem'}}>CURRENT STOCK
                                LEVEL: {props.totalStockLevel} %
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Table striped hover className="shadow p-3 bg-white rounded mb-4">
                        <thead className="thead-dark">
                        <tr>
                            <th>CODE</th>
                            <th>NAME</th>
                            <th>CATEGORY</th>
                            <th>DESCRIPTION</th>
                            <th>SUPPLIER</th>
                            <th>QUANTITY</th>
                            <th>STOCK LEVEL</th>
                            <th>
                                <Button className='btn-success btn-sm' onClick={() => {
                                    props.setPreviousContentForProductAdd('product-view');
                                    props.onContentChange('product-add');
                                }}>
                                    <PlusCircleFill/>
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableRows}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => {
                        props.onContentChange("inventory-home");
                    }}>
                        Back
                    </Button>
                </Col>
            </Row>
        </React.Fragment>
    );
}


export default ProductView;
