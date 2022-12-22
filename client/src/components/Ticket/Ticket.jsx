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
        setError(err)
      });
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "Low": {
        return "low-priority";
      }
      case "Medium": {
        return "medium-priority";
      }
      case "High": {
        return "high-priority";
      }
      case "Urgent": {
        return "urgent-priority";
      }
      default: {
        return "medium-priority";
      }
    }
  };

  return (
    <tr>
      <td scope="row"><p>{ticket.title}</p></td>
      <td><p>{ticket.description}</p></td>
      <td>{ticket.type}</td>
      <td>
        <p
          className={`${priorityColor(
            ticket.priority
          )}`}
        >
          {ticket.priority}
        </p>
      </td>
      <td>
        <button onClick={deleteTicket}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Ticket;
