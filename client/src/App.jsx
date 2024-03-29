import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import  Home  from "./pages/Home";
import { Product } from "./pages/Product";
import { ProductList } from "./pages/ProductList";
import { Cart } from "./pages/Cart";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Success from "./pages/Success";
 
const App = ()=> {
  const user = true;
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />}/>
        <Route path="/products/:category" element={<ProductList/>} />
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/success" element={<Success/>}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>}/> 
      </Routes>
    </Router>
    
  );
}

export default App;
