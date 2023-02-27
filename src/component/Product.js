import { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AddModal from './AddProduct';
import UpdateModel from './UpdateProduct';

function Product() {
    const [product, setProduct] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(() => {
        getProduct()
    }, [])
const search = useLocation();
console.log('search----',search)
    async function getProduct() {
        let productData = await fetch('http://localhost:5000/getProduct');
        productData = await productData.json();
        setProduct(productData)
    }
    async function deleteProduct(id) {
        let result = await fetch(`http://localhost:5000/delete/${id}`, { method: 'DELETE' });
        result = await result.json();
        console.log('result---', result)
        getProduct()
    }

    async function handleInput() {
        let result = await fetch('http://localhost:5000/addProduct', {
            method: 'POST',
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

    console.log(product)
    return (
        <div><br />
            <h1>Product Page</h1>
            <div className='btn-right'>
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
            </div><br /><br />
            <div className='col-sm-8 offset-sm-2'>
                <Table striped bordered hover size="sm-3">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.length > 0 ? product.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.company}</td>
                                    <td>₹{item.price}</td>
                                    {/* <td><Button type='button' variant="outline-secondary" onClick={() => navigate(`/updateProduct/${item._id}`)}>Edit</Button></td> */}
                                    <td>{<UpdateModel id={item._id} />}</td>
                                    <td><Button type='button' variant="outline-secondary" onClick={() => deleteProduct(item._id)}>Delete</Button></td>
                                </tr>
                            )
                                : <h1>No Result Found</h1>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Product;