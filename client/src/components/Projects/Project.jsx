import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ticket from "./Ticket";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import { v4 as uuid } from "uuid";

const Project = () => {
  const params = useParams();

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    type: "Bug",
    priority: "Medium",
  });
  const [error, setError] = useState("");
  const [tickets, setTickets] = useState([]);
  const { auth } = useContext(AuthContext);

  const apiCall = useAxiosWithAuth();

  const getTickets = async () => {
    apiCall({
      url: `/api/tickets/${params.projectId}`,
      method: `get`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => setTickets(res.data))
      .catch((err) => setError(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, type, priority } = newTicket;
    if (!title || !description || !type || !priority)
      setError("Please fill in all required fields");
    apiCall({
      url: `/api/tickets/${params.projectId}`,
      method: `post`,
      data: { newTicket },
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        const ticketData = res.data;
        console.log(res.data);
        setNewTicket({
          title: "",
          description: "",
          type: "Bug",
          priority: "Medium"
        });
        setTickets([...tickets, ticketData]);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div>
      <h2>Project</h2>
      {tickets.length < 1 ? (
        <p>This project does not have any tickets at the moment</p>
      ) : (
        tickets.map(ticket => <Ticket key={uuid()} ticket={ticket} />)
        )}
      <p className="mt-3 mb-2">Create ticket</p>
      <p className="error-message">{error}</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={newTicket.title}
            onChange={(e) =>
              setNewTicket((newTicket) => ({
                ...newTicket,
                title: e.target.value,
              }))
            }
            placeholder="Title"
            aria-label="Title"
            aria-describedby="basic-addon2"
            maxLength="30"
          />
        </div>
        <div className="input-group-append">
          <input
            type="text"
            className="form-control"
            value={newTicket.description}
            onChange={(e) =>
              setNewTicket((newTicket) => ({
                ...newTicket,
                description: e.target.value,
              }))
            }
            placeholder="Description"
            aria-label="Description"
            aria-describedby="basic-addon2"
            maxLength="200"
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="priority-range" className="form-label">
            Type of ticket
          </label>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            value={newTicket.type}
            onChange={(e) =>
              setNewTicket((newTicket) => ({
                ...newTicket,
                type: e.target.value,
              }))
            }
          >
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <label htmlFor="priority-range" className="form-label">
            Priority
          </label>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            value={newTicket.priority}
            onChange={(e) =>
              setNewTicket((newTicket) => ({
                ...newTicket,
                priority: e.target.value,
              }))
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Feature">Feature</option>
          </select>
        </div>

        <button type="Submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default Project;
