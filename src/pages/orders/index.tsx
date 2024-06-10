import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./orders.scss";
import { useQuery } from "@tanstack/react-query";
import api from "../../apis/apiUtil";

interface Order {
  _id: string;
  sellerId: string;
  buyerId: string;
  title: string;
  price: number;
  img: string;
}

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () =>
      api.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order: Order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await api.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err: any) {
      if (err.response.status === 404) {
        const res = await api.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;

