import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeliveryVehicles,
  createDeliveryVehicle,
} from "../store/actions/deliveryVehicleActions";

const DeliveryVehicleListPage = () => {
  const dispatch = useDispatch();
  const { deliveryVehicles, error } = useSelector(
    (store) => store.deliveryVehicleReducer
  );

  const { token } = useSelector((store) => store.authReducer);

  const [newVehicleData, setNewVehicleData] = useState({
    city: "",
    vehicleType: "",
    registrationNumber: "",
  });

  useEffect(() => {
    dispatch(fetchDeliveryVehicles(token));
  }, []);

  const handleCreateVehicle = () => {
    dispatch(createDeliveryVehicle(newVehicleData, token));
    // Clear input fields
    setNewVehicleData({
      city: "",
      vehicleType: "",
      registrationNumber: "",
    });
  };

  return (
    <div className="delivery-vehicle-list-container">
      <h1 className="login-heading">Delivery Vehicle List Page</h1>
      <div className="add-vehicle-form">
        <h2>Add New Vehicle</h2>
        <div className="form-group-delivery">
          <label className="form-label-delivery">City:</label>
          <input
            type="text"
            value={newVehicleData.city}
            onChange={(e) =>
              setNewVehicleData({ ...newVehicleData, city: e.target.value })
            }
            className="form-input-delivery"
          />
        </div>
        <div className="form-group-delivery">
          <label className="form-label-delivery">Vehicle Type:</label>
          <select
            value={newVehicleData.vehicleType}
            onChange={(e) =>
              setNewVehicleData({
                ...newVehicleData,
                vehicleType: e.target.value,
              })
            }
            className="form-input-delivery"
          >
            <option value="">Select Vehicle</option>
            <option value="bike">Bike</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <div className="form-group-delivery">
          <label className="form-label-delivery">Registration No.:</label>
          <input
            type="text"
            value={newVehicleData.registrationNumber}
            onChange={(e) =>
              setNewVehicleData({
                ...newVehicleData,
                registrationNumber: e.target.value,
              })
            }
            className="form-input-delivery"
          />
        </div>
        <button onClick={handleCreateVehicle} className="create-vehicle-button">
          Create Vehicle
        </button>
      </div>
      <ul className="vehicle-list">
        {deliveryVehicles.map((vehicle) => (
          <li key={vehicle._id} className="vehicle-item">
            Vehicle ID: {vehicle._id}, City: {vehicle.city}, Active Orders:{" "}
            {vehicle.activeOrdersCount}, Vehicle Type: {vehicle.vehicleType},
            Registration No.: {vehicle.registrationNumber}
          </li>
        ))}
      </ul>
      <div className="error-message">{error != null && <>{error} </>}</div>
    </div>
  );
};

export default DeliveryVehicleListPage;
