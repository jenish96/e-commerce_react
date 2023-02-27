import { useLocation } from "react-router-dom";
import { Table } from 'react-bootstrap';

function SearchResult()
{
    const location = useLocation();
    const result = location.state.result;
    return(
        <div><br/>
            <h1>Serch Result</h1><br/>
            <div className='col-sm-8 offset-sm-2'>
                <Table striped bordered hover size="sm-3">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result.length > 0 ? result.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.company}</td>
                                    <td>₹{item.price}</td>
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

export default SearchResult;