import React from "react";
import Ticket from "../Ticket/Ticket";
import { v4 as uuid } from "uuid";
import styles from "./ticketsTable.module.scss";

const TicketsTable = ({ ticketsInView, setTickets }) => {
  return (
    <table className={`table table-bordered ${styles.table}`}>
      <thead className="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Type</th>
          <th scope="col">Priority</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {ticketsInView.map((ticket) => {
          return <Ticket key={uuid()} ticket={ticket} setTickets={setTickets} />;
        })}
      </tbody>
    </table>
  );
};

export default TicketsTable;
