import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {updateProduct} from '../service/InventoryService';

const ProductEdit = (props) => {
    const [code, setCode] = useState(props.product.code);
    const [codeValidation, setCodeValidation] = useState(null);
    const [name, setName] = useState(props.product.name);
    const [nameValidation, setNameValidation] = useState(null);
    const [category, setCategory] = useState(props.product.category);
    const [categoryValidation, setCategoryValidation] = useState(null);
    const [description, setDescription] = useState(props.product.description);
    const [descriptionValidation, setDescriptionValidation] = useState(null);
    const [supplier, setSupplier] = useState(props.product.supplierName);
    const [supplierId, setSupplierId] = useState(props.product.supplierId);
    const [quantity, setQuantity] = useState(props.product.quantity);
    const [quantityValidation, setQuantityValidation] = useState(null);
    const [stockLevel, setStockLevel] = useState(props.product.stockLevel);
    const [stockLevelValidation, setStockLevelValidation] = useState(null);


    const handleSupplierSelect = event => {
        const selectedOption = event.target.childNodes[event.target.selectedIndex];
        setSupplierId(selectedOption.getAttribute('id'));
        setSupplier(event.target.value);
    };

    const setAllValidationsNull = () => {
        setCodeValidation(null);
        setNameValidation(null);
        setCategoryValidation(null);
        setDescriptionValidation(null);
        setQuantityValidation(null);
        setStockLevelValidation(null);
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        if (window.confirm("Do you want to update the product info?")) {
            if (codeValidation !== false && nameValidation !== false && categoryValidation !== false && descriptionValidation !== false && quantityValidation !== false && stockLevelValidation !== false) {
                const data = {
                    code: code,
                    name: name,
                    category: category,
                    description: description,
                    quantity: quantity,
                    stockLevel: stockLevel,
                    supplierId: supplierId
                };
                updateProduct(props.product.id, data).then(res => {
                    window.alert("The product has been updated.");
                    setAllValidationsNull();
                    props.onUpdate();
                });
            } else {
                window.alert("Update failed! Some fileds contain erroneous data. Please review before update.")
            }
        }

    };

    const validateCode = () => {
        if (code === undefined || code === null) {
            setCodeValidation(false);
        } else if (code === '' || code.length > 20) {
            setCodeValidation(false);
        } else {
            setCodeValidation(true);
        }
    };

    const validateName = () => {
        if (name === undefined || name === null) {
            setNameValidation(false);
        } else if (name === '' || name.length > 45) {
            setNameValidation(false);
        } else {
            setNameValidation(true);
        }
    };

    const validateCategory = () => {
        if (category === undefined || category === null) {
            setCategoryValidation(false);
        } else if (category === '' || category.length > 45) {
            setCategoryValidation(false);
        } else {
            setCategoryValidation(true);
        }
    };

    const validateDescription = () => {
        if (description && (description.length > 200)) {
            setDescriptionValidation(false);
        } else {
            setDescriptionValidation(true);
        }
    };

    const validateQuantity = () => {
        if (quantity === undefined || quantity === null) {
            setQuantityValidation(false);
        } else if (quantity === '' || quantity.length > 45) {
            setQuantityValidation(false);
        } else {
            setQuantityValidation(true);
        }
    };

    const validateStockLevel = () => {
        if (stockLevel === undefined || stockLevel === null) {
            setStockLevelValidation(false);
        } else if (isNaN(stockLevel)) {
            setStockLevelValidation(false);
        } else if ((Number(stockLevel) <= 0) || ((props.totalStockLevel - props.product.stockLevel + Number(stockLevel)) > 100)) {
            setStockLevelValidation(false);
        } else {
            setStockLevel(Number(stockLevel));
            setStockLevelValidation(true);
        }
    };

    const getFieldValidationClass = (field) => {
        switch (field) {
            case 'code':
                if (codeValidation === null) {
                    return '';
                } else {
                    return codeValidation ? 'is-valid' : 'is-invalid';
                }
            case 'name':
                if (nameValidation === null) {
                    return '';
                } else {
                    return nameValidation ? 'is-valid' : 'is-invalid';
                }
            case 'category':
                if (categoryValidation === null) {
                    return '';
                } else {
                    return categoryValidation ? 'is-valid' : 'is-invalid';
                }
            case 'description':
                if (descriptionValidation === null) {
                    return '';
                } else {
                    return descriptionValidation ? 'is-valid' : 'is-invalid';
                }
            case 'quantity':
                if (quantityValidation === null) {
                    return '';
                } else {
                    return quantityValidation ? 'is-valid' : 'is-invalid';
                }
            case 'stockLevel':
                if (stockLevelValidation === null) {
                    return '';
                } else {
                    return stockLevelValidation ? 'is-valid' : 'is-invalid';
                }
            default:
                break;
        }
    };

    const supplierOptions = props.suppliers.map(supplier =>
        <option key={supplier.id} id={supplier.id}>
            {supplier.name}
        </option>
    );

    return (
        < React.Fragment>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <h1 className="display-4">PRODUCT INFORMATION UPDATE</h1>
                    <br/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={6}>
                    <Form className="shadow p-3 mb-5 bg-white rounded">
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control type="text" value={code}
                                                  onChange={event => setCode(event.target.value)} onBlur={validateCode}
                                                  className={getFieldValidationClass('code')}/>
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
                                    <Form.Control type="text" value={name}
                                                  onChange={event => setName(event.target.value)} onBlur={validateName}
                                                  className={getFieldValidationClass('name')}/>
                                    <Form.Text className="text-muted">
                                        Name is required and should not be longer than 45 characters.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" value={category}
                                                  onChange={event => setCategory(event.target.value)}
                                                  onBlur={validateCategory}
                                                  className={getFieldValidationClass('category')}/>
                                    <Form.Text className="text-muted">
                                        Category is optional. Category length should be limited to 45 characters.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' rows={3} value={description}
                                                  onChange={event => setDescription(event.target.value)}
                                                  onBlur={validateDescription}
                                                  className={getFieldValidationClass('description')}/>
                                    <Form.Text className="text-muted">
                                        Description is optional and should be limited to 200 characters.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Supplier</Form.Label>
                                    <Form.Control as='select' value={supplier} onChange={handleSupplierSelect}>
                                        {supplierOptions}
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Description is optional and should be limited to 200 characters.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="text" value={quantity}
                                                  onChange={event => setQuantity(event.target.value)}
                                                  onBlur={validateQuantity}
                                                  className={getFieldValidationClass('quantity')}/>
                                    <Form.Text className="text-muted">
                                        Qunatity is required and should be limited to 45 characters.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Stock Level</Form.Label>
                                    <Form.Control type="number" min={0}
                                                  max={100 - (props.totalStockLevel - props.product.stockLevel)}
                                                  step='any' value={stockLevel}
                                                  onChange={event => setStockLevel(event.target.value)}
                                                  onBlur={validateStockLevel}
                                                  className={getFieldValidationClass('stockLevel')}/>
                                    <Form.Text className="text-muted">
                                        Stock level is a required value between 0-100 and should not exceed the total
                                        stock level percentage of 100.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Button variant="primary" onClick={() => {
                                    props.onContentChange("product-view");
                                }} style={{marginRight: "2rem"}}>
                                    Back
                                </Button>
                                <Button variant="primary" type="submit" onClick={handleUpdate}>
                                    Update
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ProductEdit;