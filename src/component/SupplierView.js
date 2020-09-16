import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { PencilFill, TrashFill, PlusCircleFill } from 'react-bootstrap-icons';
import { deleteSupplier } from '../service/InventoryService';

const SupplierView = (props) => {

	const handleDelete = id => {
		if (window.confirm("Do you want to delete the selected supplier?")) {
			deleteSupplier(id).then(res => {
				window.alert("The selected supplier has been deleted");
				props.onDelete();
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
					<Button className='btn-warning' onClick={() => { props.onEditClick(supplier.id) }}>
						<PencilFill />
					</Button>
					<Button className='btn-danger' onClick={() => handleDelete(supplier.id)}>
						<TrashFill />
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
					<br />
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
									<Button className='btn-success btn-sm' onClick={() => { props.setPreviousContentForSupplierAdd('supplier-view'); props.onContentChange('supplier-add'); }}>
										<PlusCircleFill />
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
					<Button variant="primary" onClick={() => { props.onContentChange("inventory-home"); }}>
						Back
					</Button>
				</Col>
			</Row>
		</React.Fragment >
	);
}

export default SupplierView;