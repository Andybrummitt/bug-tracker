import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import TablePaginationNav from "../TablePaginationNav/TablePaginationNav";
import TicketsTable from "../TicketsTable/TicketsTable";

const Tickets = () => {
  const [error, setError] = useState("");
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
      url: `/api/tickets`,
      method: `get`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => setTickets(res.data))
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      {pageNumberArray.length > 0 ? (
        <TablePaginationNav
          pageNumberArray={pageNumberArray}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
      {ticketsInView.length < 1 ? (
        <p className="text-center m-3">
          Your team does not have any tickets at the moment
        </p>
      ) : (
        <>
          <h4 className="m-3 text-center">Displaying All Team Tickets</h4>
          <TicketsTable ticketsInView={ticketsInView} setTickets={setTickets} />
        </>
      )}
      <p className="error-message">{error}</p>
    </div>
  );
};

export default Tickets;
