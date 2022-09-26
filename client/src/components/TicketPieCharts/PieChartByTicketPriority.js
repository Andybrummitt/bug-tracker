import "chart.js/auto";
import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import styles from "./pieChart.module.scss";

const PieChartByTicketPriority = ({ tickets }) => {
  const makePriorityArray = (tickets) => {
    let priorityArray = [0, 0, 0, 0];
    tickets.forEach((ticket) => {
      if (ticket.priority === "Low") {
        priorityArray[0]++;
      }
      if (ticket.priority === "Medium") {
        priorityArray[1]++;
      }
      if (ticket.priority === "High") {
        priorityArray[2]++;
      }
      if (ticket.priority === "Urgent") {
        priorityArray[3]++;
      }
    });
    return priorityArray;
  };

  const priorityArray = makePriorityArray(tickets);
  const data = {
    labels: ["Low", "Medium", "High", "Urgent"],
    datasets: [
      {
        label: "Tickets by Priority",
        data: priorityArray,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h2>Tickets by Priority</h2>
      <div className={styles.chartContainer}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChartByTicketPriority;
