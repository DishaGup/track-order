import React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import ItemListPage from '../pages/ItemListPage';
import OrderListPage from '../pages/OrderListPage';
import DeliveryVehicleListPage from '../pages/DeliveryVehicleListPage';
import CustomerListPage from '../pages/CustomerListPage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = () => {
  return (
    <Routes>
       
    <Route path="/" element={<LoginPage />} />
    <Route path="/items" element={<ItemListPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path ='/register' element={<RegisterPage />}  />
      <Route path="/orders" element={<OrderListPage />} />
      <Route path="/delivery-vehicles" element={<DeliveryVehicleListPage />} />
      <Route path="/customers" element={<CustomerListPage />} />
  </Routes>

  )
}

export default AppRoutes