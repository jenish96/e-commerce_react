import './App.css';
import NavBar from './component/NavBar';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import AddProduct from './component/AddProduct';
import UpdateProduct from './component/UpdateProduct';
import Product from './component/Product';
import PrivateComponent from './component/PrivateComponent';
import SearchResult from './component/SearchResult';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path='/getProduct' element={<Product />} />
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/updateProduct/:id' element={<UpdateProduct />} />
          <Route path='/serachResult' element={<SearchResult />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
