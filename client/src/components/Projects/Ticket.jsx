import React from "react";

const Ticket = ({ ticket }) => {
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
