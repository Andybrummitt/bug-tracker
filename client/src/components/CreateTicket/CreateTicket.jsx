import React from "react";
import styles from "./createTicket.module.scss";

const CreateTicket = ({ setNewTicket, newTicket, handleSubmit }) => {
  return (
    <div className={styles.container}>
      <h2>Create ticket</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={newTicket.title}
            onChange={(e) =>
              setNewTicket((newTicket) => ({
                ...newTicket,
                title: e.target.value,
              }))
            }
            placeholder="Title"
            aria-label="Title"
            maxLength="30"
          />
        </div>
        <div>
          <textarea
            type="text"
            value={newTicket.description}
            onChange={(e) =>
              setNewTicket((newTicket) => ({
                ...newTicket,
                description: e.target.value,
              }))
            }
            placeholder="Description"
            aria-label="Description"
            maxLength="250"
          />
        </div>
        <div className="flex-row">
          <div className={styles.inputSelectContainer}>
            <label htmlFor="priority-range">Type of ticket</label>
            <select
              aria-label="ticket-type"
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
          <div className={styles.inputSelectContainer}>
            <label htmlFor="priority-range">Priority</label>
            <select
              aria-label="ticket-priority"
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
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>
        <div>
          <button type="Submit">Create Ticket</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
