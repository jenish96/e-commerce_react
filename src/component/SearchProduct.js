import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [search, setSearch] = useState({});
    const navigate = useNavigate();
    async function handleSearch(name) {
        let result = await fetch(`http://localhost:5000/search/${name}`)
        result = await result.json();
        setSearch(result)
        navigate('/serachResult',{state:{result:search}});
    }
    return (
        <>
            <div className='d-flex me-2 right'>
                <input type='text' className='form-control' onChange={(e) => handleSearch(e.target.value)} placeholder='Search here' />
            </div>
            {/* <Button variant="outline-light" onClick={handleSearch} className='right'>Search</Button> */}
        </>
    )
}

export default Search;