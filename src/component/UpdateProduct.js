import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';

function UpdateProduct(props) {
    const [product, setProduct] = useState({
        name: '',
        company: '',
        price: ''
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    const navigate = useNavigate();
    console.log('props',props.id)

    useEffect(() => {
        getProduct()
    }, [])

    async function getProduct() {
        let result = await fetch(`http://localhost:5000/product/${props.id}`);
        result = await result.json();
        console.log("result --> ", result)
        setProduct({ ...result });
    }

    async function handelUpdate() {
        let result = await fetch(`http://localhost:5000/updateProduct/${props.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(product)
        })
        result = await result.json();
        handleClose()
        getProduct()
    }

    return (
        <>
            <Button variant="secondry" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body><br />
                    <input type='text' className='form-control' value={product?.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} placeholder='Enter Product Name' />
                    <br /><br />
                    <input type='text' className='form-control' value={product?.company} onChange={(e) => setProduct({ ...product, company: e.target.value })} placeholder='Enter Company name' />
                    <br /><br />
                    <input type='text' className='form-control' value={product?.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder='Enter Price' />
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handelUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateProduct;