import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {PencilFill, PlusCircleFill, TrashFill} from 'react-bootstrap-icons';
import API from '../api';

const SupplierView = (props) => {

    const handleDelete = id => {
        if (window.confirm("Do you want to delete the selected supplier?")) {
            API.delete(`/supplier/${id}`)
                .then(res => {
                    window.alert("The selected supplier has been deleted");
                    props.onDelete();
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 500) {
                            alert('Since the supplier is associated with products, delete operation cannot be performed. Please detatch the supplier from all the products first.')
                        } else {
                            console.log('Internal Server Error');
                            alert('Could not delete the supplier. Internal Server Error');
                        }
                    } else if (err.request) {
                        console.log('Network error or server is not responding');
                        alert('Could not delete the supplier. Network error or the server is not responding');
                    }
                });
        }
    }

    const tableRows = props.suppliers.map(supplier =>
        <tr key={supplier.id}>
            <td>{supplier.code}</td>
            <td>{supplier.name}</td>
            <td>{supplier.email}</td>
            <td>{supplier.contact}</td>
            <td>
                <div className='btn-group-sm'>
                    <Button className='btn-warning' onClick={() => {
                        props.onEditClick(supplier.id)
                    }}>
                        <PencilFill/>
                    </Button>
                    <Button className='btn-danger' onClick={() => handleDelete(supplier.id)}>
                        <TrashFill/>
                    </Button>
                </div>
            </td>
        </tr>
    );

    return (
        <React.Fragment>
            <Row>
                <Col className="text-center">
                    <h1 className="display-4">SUPPLIER INFORMATION</h1>
                    <br/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped hover className="shadow p-3 mb-5 bg-white rounded">
                        <thead className="thead-dark">
                        <tr>
                            <th>CODE</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>CONTACT</th>
                            <th>
                                <Button className='btn-success btn-sm' onClick={() => {
                                    props.setPreviousContentForSupplierAdd('supplier-view');
                                    props.onContentChange('supplier-add');
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

export default SupplierView;
