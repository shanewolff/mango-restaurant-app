import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function InventoryHome(props) {
	return (
		<React.Fragment>
			<Row>
				<Col className="text-center">
					<h1 className="display-4">INVENTORY MANAGEMENT</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<Card style={{ width: '30rem' }} className="shadow p-3 mb-5 bg-white rounded">
						<Card.Img variant="top" src="supplier.jpg" />
						<Card.Body>
							<Card.Title>SUPPLIER MANAGEMENT</Card.Title>
							<Card.Text>
								View all suppliers, update them as required.
    							</Card.Text>
							<Button variant="primary" onClick={() => { props.onContentChange("supplier-view"); }}>View Suppliers</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card style={{ width: '30rem' }} className="shadow p-3 mb-5 bg-white rounded">
						<Card.Img variant="top" src="supplier.jpg" />
						<Card.Body>
							<Card.Title>SUPPLIER MANAGEMENT</Card.Title>
							<Card.Text>
								Add new suppliers to the system.
    							</Card.Text>
							<Button variant="primary" onClick={() => {props.setPreviousContentForSupplierAdd('inventory-home'); props.onContentChange('supplier-add');}}>Add Suppliers</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Card style={{ width: '30rem' }} className="shadow p-3 mb-5 bg-white rounded">
						<Card.Img variant="top" src="product.png" />
						<Card.Body>
							<Card.Title>PRODUCT MANAGEMENT</Card.Title>
							<Card.Text>
								View all products, update them as required.
    							</Card.Text>
							<Button variant="primary">View Products</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card style={{ width: '30rem' }} className="shadow p-3 mb-5 bg-white rounded">
						<Card.Img variant="top" src="product.png" />
						<Card.Body>
							<Card.Title>PRODUCT MANAGEMENT</Card.Title>
							<Card.Text>
								Add new products to the system.
    							</Card.Text>
							<Button variant="primary">Add Products</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</React.Fragment >
	);
}

export default InventoryHome;