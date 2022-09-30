import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import CreateTicket from "../CreateTicket/CreateTicket";
import TablePaginationNav from "../TablePaginationNav/TablePaginationNav";
import TicketsTable from "../TicketsTable/TicketsTable";
import PropagateLoader from "react-spinners/PropagateLoader";

const Project = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    type: "Bug",
    priority: "Medium",
  });
  const [error, setError] = useState("");
  const [ successMessage, setSuccessMessage ] = useState("");
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [ticketsInView, setTicketsInView] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberArray, setPageNumberArray] = useState([]);
  const ticketsPerPage = 2;
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    //  GET INITIAL TICKETS
    getTickets();
  }, []);

  useEffect(() => {
    //  SET PAGE NUMBER
    const numOfPages = Math.ceil(tickets.length / ticketsPerPage);
    let tempPageNumberArray = [];
    for (let i = 0; i < numOfPages; i++) {
      tempPageNumberArray.push(i + 1);
    }
    setPageNumberArray(tempPageNumberArray);
  }, [tickets]);

  useEffect(() => {
    //  SHOW TICKETS PER PAGE CHANGE
    const firstTicketIndex = (currentPage - 1) * ticketsPerPage;
    const viewedTickets = tickets.slice(
      firstTicketIndex,
      firstTicketIndex + ticketsPerPage
    );
    setTicketsInView(viewedTickets);
  }, [tickets, currentPage]);

  useEffect(() => {
    //  WHEN DELETING LAST TICKET FROM PAGE > GO TO PREV PAGE
    if (ticketsInView.length < 1 && currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }, [ticketsInView]);

  const apiCall = useAxiosWithAuth();

  const getTickets = async () => {
    apiCall({
      url: `/api/tickets/${params.projectName}`,
      method: `get`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => setTickets(res.data))
      .catch((err) => {
        if(err.response.status === 404){
          navigate('/error/404')
        }
        setError(err.message)
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");
    if(tickets.length > 29) return setError("Projects can only have up to 30 tickets at a time.")
    const { title, description, type, priority } = newTicket;
    if (!title || !description || !type || !priority) return setError("Please fill in all required fields");
    apiCall({
      url: `/api/tickets/${params.projectName}`,
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
        setSuccessMessage("Ticket created.")
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h2 className="text-center mt-2 mb-5">{`Project: ${decodeURI(
        params.projectName
      )}`}</h2>
      {pageNumberArray.length > 0 ? (
        <>
          <h4 className="text-center m-3">Project Tickets</h4>
          <TablePaginationNav
            pageNumberArray={pageNumberArray}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : null}
      {ticketsInView.length < 1 && loading === false ? (
        <p className="text-center m-3">
          This project does not have any tickets at the moment
        </p>
      ) : ticketsInView.length < 1 && loading === true ? (
        <div className="text-center m-3">
          <PropagateLoader />
        </div>
      ) : (
        <TicketsTable ticketsInView={ticketsInView} setTickets={setTickets} />
      )}
      <p className="text-danger text-center m-3">{error}</p>
      <p className="text-success text-center m-3">{successMessage}</p>
      <CreateTicket
        newTicket={newTicket}
        setNewTicket={setNewTicket}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Project;
