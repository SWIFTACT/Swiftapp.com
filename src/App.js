import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ExploreMore from './pages/ExploreMore';
import Restaurants from './pages/Restaurants';
import CartPage from './pages/CartPage';
import ForgetPassword from './pages/ForgetPassword';
import SignUp from './component/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exploremore" element={<ExploreMore />} />
        <Route path="/mycart" element={<CartPage />} />
        <Route path="/restaurants">
          <Route path=":restaurantname" element={<Restaurants />} />
        </Route>
        {/* <Route path="/login" element={<SignUp />} /> */}
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
