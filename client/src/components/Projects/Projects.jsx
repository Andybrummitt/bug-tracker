import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import ProjectsList from "./ProjectsList";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [error, setError] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const apiCall = useAxiosWithAuth();

  useEffect(() => {
    getProjects();
    console.log(projects);
  }, []);

  const getProjects = async () => {
    apiCall({
      url: `/api/projects`,
      method: `get`,
    })
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject) setError("Please name the project");
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
        setNewProject("");
        setProjects([...projects, projectData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 className="text-center m-3">Projects</h2>
      {projects.length < 1 ? (
        <p className="text-center text-danger">
          Your team doesn't seem to have any active projects at the moment
        </p>
      ) : (
        <ProjectsList projects={projects} />
      )}
      <div className="new-project-container p-2">
        {error ? <p className="error">{error}</p> : null}
        <p className="mt-3 mb-2">Add a new project</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Project Name"
            aria-label="Project Name"
            aria-describedby="basic-addon2"
            maxLength="30"
          />
          <div className="input-group-append">
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              type="submit"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
