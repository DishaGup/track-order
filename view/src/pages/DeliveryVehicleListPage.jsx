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
    <div>
      <h1>Delivery Vehicle List Page</h1>
      <div>
        <h2>Add New Vehicle</h2>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={newVehicleData.city}
            onChange={(e) =>
              setNewVehicleData({ ...newVehicleData, city: e.target.value })
            }
          />
        </div>
        <div>

          <label>Vehicle Type:</label>
          <select   value={newVehicleData.vehicleType}
            onChange={(e) =>
              setNewVehicleData({ ...newVehicleData, vehicleType: e.target.value })
            }>
              <option value="">Select Vehicle</option>
            <option value="bike">Bike</option>
            <option value="truck">Truck</option>
          </select>
  
        </div>
        <div>
          <label>Registration No.:</label>
          <input
            type="text"
            value={newVehicleData.registrationNumber}
            onChange={(e) =>
              setNewVehicleData({
                ...newVehicleData,
                registrationNumber: e.target.value,
              })
            }
          />
        </div>
        <button onClick={handleCreateVehicle}>Create Vehicle</button>
      </div>
      <ul>
        {deliveryVehicles.map((vehicle) => (
          <li key={vehicle._id}>
            Vehicle ID: {vehicle._id}, City: {vehicle.city}, Active Orders:{" "}
            {vehicle.activeOrdersCount}, Vehicle Type: {vehicle.vehicleType},
            Registration No.: {vehicle.registrationNumber}
          </li>
        ))}
      </ul>
      <div>{error != null && <>{error} </>}</div>
    </div>
  );
};

export default DeliveryVehicleListPage;
