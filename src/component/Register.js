import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    async function handleInput() {
        let result = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        result = await result.json();
        localStorage.setItem('user',JSON.stringify(result));
        navigate('/getProduct')
        console.log('User',result)
    }
    return (
        <div className='col-sm-6 offset-sm-3'><br />
            <h1>Register</h1><br /><br />

            <input type='text' className='form-control' onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder='Enter Your Name' />
            <br /><br />
            <input type='text' className='form-control' onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Enter Your Email' />
            <br /><br />
            <input type='password' className='form-control' onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Enter Password' />
            <br /><br />
            <button type='button' className='btn btn-secondary' onClick={handleInput} >Register</button>

        </div>
    )
}

export default Register;