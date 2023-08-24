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
    <div className="customer-list-container">
    <h1 className='login-heading'>Customers</h1>
    <ul className="customer-list">
      {customers &&
        customers.map((customer) => (
          <li key={customer._id} className="customer-item">
            {customer.name} - {customer.city}
          </li>
        ))}
    </ul>
    <form className="customer-form" onSubmit={handleSubmit}>
      <div className="form-group-delivery">
        <label className="form-label-delivery">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input-delivery"
          placeholder="Name"
        />
      </div>
      <div className="form-group-delivery">
        <label className="form-label-delivery">City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="form-input"
          placeholder="City"
        />
      </div>
      <button type="submit" className="create-customer-button">
        Create Customer
      </button>
    </form>
  </div>
  )
}

export default CustomerListPage