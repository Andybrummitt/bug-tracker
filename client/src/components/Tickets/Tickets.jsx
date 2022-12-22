import React, { useContext, useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import TablePaginationNav from "../TablePaginationNav/TablePaginationNav";
import TicketGraphDisplay from "../TicketGraphDisplay/TicketGraphDisplay";
import TicketsTable from "../TicketsTable/TicketsTable";
import styles from "./tickets.module.scss";
import Navbar from "../Navbars/DashboardNavbar/Navbar.jsx";

const Tickets = () => {
  const [error, setError] = useState("");
  const [tickets, setTickets] = useState([]);
  const [ticketsInView, setTicketsInView] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberArray, setPageNumberArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const ticketsPerPage = 5;
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
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <main className={styles.container}>
      <header>
        <Navbar />
      </header>
      <div className={styles.container}>
        {pageNumberArray.length > 0 ? (
          <>
            <h4 className="text-center-padded">Displaying All Team Tickets</h4>
            <TablePaginationNav
              pageNumberArray={pageNumberArray}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : null}
        {ticketsInView.length < 1 && loading === false ? (
          <p className="text-center-padded">
            Your team does not have any tickets at the moment
          </p>
        ) : ticketsInView.length < 1 && loading === true ? (
          <div className="text-center-padded">
            <PropagateLoader />
          </div>
        ) : (
          <>
            <TicketsTable
              ticketsInView={ticketsInView}
              setTickets={setTickets}
            />
          </>
        )}
        <p className="error-message">{error}</p>
        <TicketGraphDisplay tickets={tickets} />
      </div>
    </main>
  );
};

export default Tickets;
