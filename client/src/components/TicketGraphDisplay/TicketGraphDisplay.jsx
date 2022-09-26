import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import PieChartByTicketPriority from "../TicketPieCharts/PieChartByTicketPriority";
import PieChartByTicketType from "../TicketPieCharts/PieChartByTicketType";
import styles from "./ticketGraphDisplay.module.scss";

const TicketGraphDisplay = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const apiCall = useAxiosWithAuth();

  const getAllTickets = () => {
    apiCall({
      url: `/api/tickets`,
      method: `get`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        const ticketData = res.data;
        setTickets(ticketData);
        setError("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div>
      {tickets.length > 0 && (
        <div className={styles.container}>
          <PieChartByTicketType tickets={tickets} />
          <PieChartByTicketPriority tickets={tickets} />
        </div>
      )}
    </div>
  );
};

export default TicketGraphDisplay;
