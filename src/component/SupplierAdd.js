import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addSupplier } from '../service/InventoryService';

const SupplierAdd = (props) => {
	const [code, setCode] = useState('');
	const [codeValidation, setCodeValidation] = useState(null);
	const [name, setName] = useState('');
	const [nameValidation, setNameValidation] = useState(null);
	const [email, setEmail] = useState('');
	const [emailValidation, setEmailValidation] = useState(null);
	const [contact, setContact] = useState('');
	const [contactValidation, setContactValidation] = useState(null);

	const setAllValidationsNull = () => {
		setCodeValidation(null);
		setNameValidation(null);
		setEmailValidation(null);
		setContactValidation(null);
	};

	const resetFields = () => {
		setCode('');
		setName('');
		setEmail('');
		setContact('');
	};

	const validateCode = () => {
		if (code === '' || code.length > 20) {
			setCodeValidation(false);
		} else {
			setCodeValidation(true);
		}
	};

	const validateName = () => {
		if (name === '' || name.length > 45) {
			setNameValidation(false);
		} else {
			setNameValidation(true);
		}
	};

	const validateEmail = () => {
		const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (email && (code.length > 20 || !EMAIL_REGEX.test(email))) {
			setEmailValidation(false);
		} else {
			setEmailValidation(true);
		}
	};

	const validateContact = () => {
		const CONTACT_REGEX = /^\d{10}$/;
		if (contact === '' || !CONTACT_REGEX.test(contact)) {
			setContactValidation(false);
		} else {
			setContactValidation(true);
		}
	};

	const getFieldValidationClass = (field) => {
		switch (field) {
			case 'code':
				if (codeValidation === null) {
					return '';
				}
				else {
					return codeValidation ? 'is-valid' : 'is-invalid';
				}
			case 'name':
				if (nameValidation === null) {
					return '';
				}
				else {
					return nameValidation ? 'is-valid' : 'is-invalid';
				}
			case 'email':
				if (emailValidation === null) {
					return '';
				}
				else {
					return emailValidation ? 'is-valid' : 'is-invalid';
				}
			case 'contact':
				if (contactValidation === null) {
					return '';
				}
				else {
					return contactValidation ? 'is-valid' : 'is-invalid';
				}
			default:
				break;
		}
	};

	const handleAdd = event => {
		event.preventDefault();
		if (window.confirm("Do you want to register this new supplier?")) {
			validateCode();
			validateName();
			validateEmail();
			validateContact();

			if (codeValidation && nameValidation && emailValidation && contactValidation) {
				const data = {
					code: code,
					name: name,
					email: email,
					contact: contact
				};
				addSupplier(data).then(res => {
					window.alert("The supplier has been registered.");
					resetFields();
					setAllValidationsNull();
					props.onAdd();
				});
			}
			else {
				window.alert("Registration failed! Some fileds contain erroneous data. Please review before update.")
			}
		}
	};

	return (
		<React.Fragment>
			<Row className="justify-content-center">
				<Col className="text-center">
					<h1 className="display-4">NEW SUPPLIER REGISTRATION</h1>
					<br />
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col xs={6}>
					<Form className="shadow p-3 mb-5 bg-white rounded">
						<Form.Row>
							<Col>
								<Form.Group>
									<Form.Label>Code</Form.Label>
									<Form.Control type="text" value={code} onChange={event => setCode(event.target.value)} onBlur={validateCode} className={getFieldValidationClass('code')} />
									<Form.Text className="text-muted">
										Code is required and should not be longer than 20 characters.
							</Form.Text>
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Group>
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" value={name} onChange={event => setName(event.target.value)} onBlur={validateName} className={getFieldValidationClass('name')} />
									<Form.Text className="text-muted">
										Name is required and should not be longer than 45 characters.
							</Form.Text>
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Group>
									<Form.Label>Email Address</Form.Label>
									<Form.Control type="email" value={email} onChange={event => setEmail(event.target.value)} onBlur={validateEmail} className={getFieldValidationClass('email')} />
									<Form.Text className="text-muted">
										Email is optional. Address length should be limited to 45 characters.
							</Form.Text>
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Group>
									<Form.Label>Contact Number</Form.Label>
									<Form.Control type="text" value={contact} onChange={event => setContact(event.target.value)} onBlur={validateContact} className={getFieldValidationClass('contact')} />
									<Form.Text className="text-muted">
										Contact number is required and should include only 10 digits. (E.g. 0112345678)
							</Form.Text>
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Button variant="primary" onClick={() => { props.onContentChange(props.previousContent); }} style={{ marginRight: "2rem" }}>
									Back
								</Button>
								<Button variant="primary" type="submit" onClick={handleAdd}>
									Add
								</Button>
							</Col>
						</Form.Row>
					</Form>
				</Col>
			</Row>
		</React.Fragment>
	);
}

export default SupplierAdd;