import "chart.js/auto";
import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import styles from "./pieChart.module.scss";

const PieChartByTicketType = ({ tickets }) => {
  const makeTypeArray = (tickets) => {
    let typeArray = [0, 0];
    tickets.forEach((ticket) => {
      if (ticket.type === "Bug") {
        typeArray[0]++;
      }
      if (ticket.type === "Feature") {
        typeArray[1]++;
      }
    });
    return typeArray;
  };

  const typeArray = makeTypeArray(tickets);
  const data = {
    labels: ["Bug", "Feature"],
    datasets: [
      {
        label: "Tickets by Type",
        data: typeArray,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h2>Tickets by Type</h2>
      <div className={styles.chartContainer}>
      <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChartByTicketType;
