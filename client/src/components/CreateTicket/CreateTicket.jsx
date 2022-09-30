import React from "react";
import styles from "./createTicket.module.scss";

const CreateTicket = ({ setNewTicket, newTicket, handleSubmit }) => {
  return (
    <div className={styles.container}>
      <h2 className="mt-3 mb-2">Create ticket</h2>
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
          <textarea
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
            maxLength="250"
          />
        </div>
        <div className={styles.selectInputsContainer}>
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
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" type="Submit">
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
