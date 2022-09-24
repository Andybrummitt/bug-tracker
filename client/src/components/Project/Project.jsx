import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import CreateTicket from "../CreateTicket/CreateTicket";
import Ticket from "../Ticket/Ticket";

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

  useEffect(() => {
    console.log(tickets)
  }, [tickets])

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
          priority: "Medium",
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
        tickets.map((ticket) => <Ticket key={uuid()} ticket={ticket} setTickets={setTickets} tickets={tickets} />)
      )}
      <p className="error-message">{error}</p>
      <CreateTicket
        newTicket={newTicket}
        setNewTicket={setNewTicket}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Project;
