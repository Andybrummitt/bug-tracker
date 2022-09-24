import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";

const Ticket = ({ ticket, setTickets, tickets }) => {
  const params = useParams();
  const apiCall = useAxiosWithAuth();
  const { auth } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  console.log(ticket);

  const deleteTicket = () => {
    //  show areyousure modal component
    apiCall({
      url: `/api/tickets/${params.projectId}/${ticket._id}`,
      method: `delete`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        const ticketId = res.data;
        setTickets((tickets) =>tickets.filter((ticket) => ticket._id !== ticketId));
        setSuccessMessage(res.data);
      })
      .catch((err) => setError(err));
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
    <div>
      <li className="list-group-item">
        <div className="d-flex justify-content-between align-content-center">
          <span>
            <span className="font-weight-bold">Title: </span>
            {ticket.title}
          </span>
          <span>
            <span className="font-weight-bold">Type: </span>
            {ticket.type}
          </span>
          <span
            className={`badge badge-primary badge-pill ${priorityColor(
              ticket.priority
            )}`}
          >{`${ticket.priority} priority`}</span>
          <button className="btn btn-danger" onClick={deleteTicket}>
            Delete
          </button>
        </div>
        <hr />
        <p>
          <span className="font-weight-bold">Description: </span>
          {ticket.description}
        </p>
      </li>
    </div>
  );
};

export default Ticket;
