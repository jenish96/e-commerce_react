import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    async function handleInput() {
        let result = await fetch('localhost:5000/addHotelType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(product)
        })
        result = await result.json();
        handleClose()
        navigate('/getProduct');
    }

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={show} onHide={handleClose} animation={false} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body><br />
                    <input type='text' className='form-control' onChange={(e) => setProduct({ ...product, name: e.target.value })} placeholder='Enter Product Name' />
                    <br />
                    <input type='text' className='form-control' onChange={(e) => setProduct({ ...product, company: e.target.value })} placeholder='Enter Company name' />
                    <br />
                    <input type='text' className='form-control' onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder='Enter Price' />
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleInput}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddModal;