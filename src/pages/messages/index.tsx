import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import api from "../../apis/apiUtil";
import "./messeges.scss";
import moment from "moment";

interface Conversation {
  id: string;
  buyerId: string;
  sellerId: string;
  readBySeller: boolean;
  readByBuyer: boolean;
  lastMessage: string;
  updatedAt: string;
}

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: () =>
      api.get(`/conversations`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return api.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["conversations"]});
    },
  });

  const handleRead = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data?.map((c) => (
              <tr
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  "active"
                }
                key={c.id}
              >
                <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;

