import { useState, useEffect } from "react";
import { ShowUser } from "../services/userService";

function UserPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await ShowUser();
        setUser(response);
        console.log("User:", response);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>UserPage</h1>
      {user && (
        <div>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <h2>Orders:</h2>
          {user.orders.map((order) => (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total Price: {order.total_price}</p>
              <h3>Order Items:</h3>
              {order.order_items.map((orderItem) => (
                <div key={orderItem.id}>
                  <p>Product ID: {orderItem.product_id}</p>
                  <p>Quantity: {orderItem.quantity}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPage;
