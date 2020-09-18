import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {PencilFill, PlusCircleFill, TrashFill} from 'react-bootstrap-icons';
import './ProductView.css';
import API from '../api';

const ProductView = (props) => {

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
    const tableRows = props.products.map(product =>
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
            <Row>
                <Col>
                    <div className="progress" style={{height: '2.5rem'}}>
                        <div className={getProgressBarClasses()} role="progressbar"
                             aria-valuenow={props.totalStockLevel} aria-valuemin="0" aria-valuemax="100"
                             style={{width: `${props.totalStockLevel}%`}}>
                            <div className='progress-bar-text' style={{fontSize: '1rem'}}>CURRENT STOCK
                                LEVEL: {props.totalStockLevel}%
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Table striped hover className="shadow p-3 mb-5 bg-white rounded">
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
