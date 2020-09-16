import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { PencilFill, TrashFill, PlusCircleFill } from 'react-bootstrap-icons';
import { deleteProduct } from '../service/InventoryService';

const ProductView = (props) => {

	const handleDelete = id => {

	};

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
					<Button className='btn-warning' onClick={() => { props.onEditClick(product.id) }}>
						<PencilFill />
					</Button>
					<Button className='btn-danger' onClick={() => handleDelete(product.id)}>
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
					<h1 className="display-4">PRODUCT INVENTORY</h1>
					<br />
				</Col>
			</Row>
			<Row>
				<Col>
					<Table striped hover>
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
									<Button className='btn-success btn-sm' onClick={() => { props.setPreviousContentForProductAdd('product-view'); props.onContentChange('product-add'); }}>
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

export default ProductView;