import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    async function handleInput() {
        let result = await fetch('http://localhost:5000/login', {
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
    }

    return (
        <div className='col-sm-6 offset-sm-3'><br />
            <h1>Login</h1><br /><br />

            <input type='text' className='form-control' onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Enter Your Email' />
            <br /><br />
            <input type='password' className='form-control' onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Enter Password' />
            <br /><br />
            <button type='button' className='btn btn-secondary' onClick={handleInput} >Login</button>

        </div>
    )
}

export default Login;