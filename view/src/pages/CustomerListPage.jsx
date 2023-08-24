import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, createCustomer } from '../store/actions/customerActions'; // Import the actions


const CustomerListPage = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((store) => store.customerReducer);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
  });

  const {token } =useSelector((store)=>store.authReducer)

  useEffect(() => {
    dispatch(fetchCustomers(token));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit=(e)=>{
e.preventDefault()
 dispatch(createCustomer(formData,token))
  }
  return (
    <div>
    <h1>Customers</h1>
    <ul>
      {customers &&
        customers.map((customer) => (
          <li key={customer._id}>{customer.name} -{customer.city}</li>
        ))}
    </ul>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <button type="submit">Create Customer</button>
    </form>
  </div>
  )
}

export default CustomerListPage