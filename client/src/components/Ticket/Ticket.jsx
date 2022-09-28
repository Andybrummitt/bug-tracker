import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";

const Ticket = ({ ticket, setTickets }) => {
  const params = useParams();
  const apiCall = useAxiosWithAuth();
  const { auth } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const deleteTicket = () => {
    //  show areyousure modal component
    apiCall({
      url: `/api/tickets/${params.projectName}/${ticket._id}`,
      method: `delete`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        const ticketId = res.data;
        setTickets((tickets) =>
          tickets.filter((ticket) => ticket._id !== ticketId)
        );    
        setSuccessMessage(res.data);
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      });
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "Low": {
        return "bg-info";
      }
      case "Medium": {
        return "bg-primary";
      }
      case "High": {
        return "bg-warning";
      }
      case "Urgent": {
        return "bg-danger";
      }
      default: {
        return "bg-primary";
      }
    }
  };

  return (
    <tr>
      <th scope="row">{ticket.title}</th>
      <td>{ticket.description}</td>
      <td>{ticket.type}</td>
      <td>
        <span
          className={`badge badge-primary badge-pill ${priorityColor(
            ticket.priority
          )}`}
        >
          {ticket.priority}
        </span>
      </td>
      <td>
        <button className="btn btn-danger" onClick={deleteTicket}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Ticket;
