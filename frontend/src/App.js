import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddProducts from './pages/AddProducts';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify"
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

function App() {
  
  return (
    <div className="App">
      <Router>
        <ToastContainer/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product">
            <Route path=":id" element={<ProductDetails/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/addproducts" element={<AddProducts/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
