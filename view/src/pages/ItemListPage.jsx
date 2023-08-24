import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/actions/itemActions";
import CreateItemModal from "../components/CreateItemModal ";

const ItemListPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.itemReducer);
  //console.log(store)
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { token } = useSelector((store) => store.authReducer);
  useEffect(() => {
    dispatch(fetchItems(token));
  }, []);

  const handleOrderClick = (item) => {
    // Handle placing an order here
    // This could include showing a confirmation modal, making an API call, etc.
    console.log(`Placing an order for item: ${item.name}`);
  };
  return (
    <div>
      <h1>Item List Page</h1>
      <button onClick={toggleModal}>Create Item</button>
      <ul>
        {items &&
          items.map((item) => (
            <div className="item-card" key={item._id}>
              <div className="item-card-header">{item.name}</div>
              <div className="item-card-price">${item.price}</div>
              <button onClick={() => handleOrderClick(item)}>Order</button>
            </div>
          ))}
      </ul>
      <CreateItemModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default ItemListPage;
