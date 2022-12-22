import React, { useContext, useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import ProjectsList from "../ProjectsList/ProjectsList";
import "../_variables.scss";
import styles from "./projects.module.scss";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const apiCall = useAxiosWithAuth();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    apiCall({
      url: `/api/projects`,
      method: `get`,
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => setProjects(res.data))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projects.length > 4)
      return setError("Each team can only have up to 5 projects at a time.");
    if (!newProject.title) return setError("Please provide a project name.");
    if (!newProject.description)
      return setError("Please provide a project description.");
    apiCall({
      url: `/api/projects`,
      method: `post`,
      data: { newProject },
      headers: JSON.stringify({
        Authorization: `Bearer ${auth.userAccessToken}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        const projectData = res.data;
        setNewProject({ title: "", description: "" });
        setError("");
        setProjects([...projects, projectData]);
      })
      .catch((err) => {
        setError(err.response.data)
      });
  };
  return (
    <div>
      {projects.length < 1 && loading === false ? (
        <p className="text-center-padded">
          Your team doesn't seem to have any active projects at the moment
        </p>
      ) : projects.length < 1 && loading === true ? (
        <div>
          <PropagateLoader />
        </div>
      ) : (
        <ProjectsList projects={projects} setProjects={setProjects} />
      )}
      <div className={styles.formContainer}>
        {error ? <p className="error-message">{error}</p> : null}
        <form>
          <h2>Add a Project</h2>
          <div>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) =>
                setNewProject((project) => ({
                  ...project,
                  title: e.target.value,
                }))
              }
              placeholder="Project Name"
              aria-label="Project Name"
              maxLength="30"
            />
          </div>
          <div>
            <textarea
              type="text"
              value={newProject.description}
              onChange={(e) =>
                setNewProject((project) => ({
                  ...project,
                  description: e.target.value,
                }))
              }
              placeholder="Project Description"
              aria-label="Project Description"
              maxLength="150"
            />
          </div>
          <div>
            <button onClick={handleSubmit} type="submit">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Projects;
