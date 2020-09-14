import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateSupplier } from '../service/InventoryService';

const SupplierEdit = (props) => {
	const [code, setCode] = useState(props.supplier.code);
	const [name, setName] = useState(props.supplier.name);
	const [email, setEmail] = useState(props.supplier.email);
	const [contact, setContact] = useState(props.supplier.contact);

	const handleUpdate = (event) => {
		event.preventDefault();
		if (window.confirm("Do you want to update the supplier info?")) {
			const data = {
				code: code,
				name: name,
				email: email,
				contact: contact
			};
			updateSupplier(props.supplier.id, data).then(res => {
				window.alert("The supplier has been updated.");
				props.onUpdate();
			});
		}

	};

	const validateFields = () => {

	};

	return (
		<React.Fragment>
			<Row className="justify-content-center">
				<Col className="text-center">
					<h1 className="display-4">SUPPLIER INFORMATION UPDATE</h1>
					<br />
				</Col>
			</Row>
			<Form>
				<Form.Row className="justify-content-center">
					<Col xs={6}>
						<Form.Group>
							<Form.Label>Code</Form.Label>
							<Form.Control type="text" value={code} onChange={event => setCode(event.target.value)} />
							<Form.Text className="text-muted">

							</Form.Text>
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row className="justify-content-center">
					<Col xs={6}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
							<Form.Text className="text-muted">

							</Form.Text>
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row className="justify-content-center">
					<Col xs={6}>
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control type="email" value={email} onChange={event => setEmail(event.target.value)} />
							<Form.Text className="text-muted">

							</Form.Text>
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row className="justify-content-center">
					<Col xs={6}>
						<Form.Group>
							<Form.Label>Contact Number</Form.Label>
							<Form.Control type="text" value={contact} onChange={event => setContact(event.target.value)} />
							<Form.Text className="text-muted">

							</Form.Text>
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row className="justify-content-center">
					<Col xs={6}>
						<Button variant="primary" onClick={() => { props.onContentChange("supplier-view"); }} style={{ marginRight: "2rem" }}>
							Back
						</Button>
						<Button variant="primary" type="submit" onClick={event => handleUpdate(event)}>
							Update
						</Button>
					</Col>
				</Form.Row>
			</Form>

		</React.Fragment>
	);
}

export default SupplierEdit;