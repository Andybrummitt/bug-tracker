import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosWithAuth from "../../hooks/useAxiosWithAuth";
import ProjectsList from "../ProjectsList/ProjectsList";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const apiCall = useAxiosWithAuth();

  useEffect(() => {
    getProjects();
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
    if (!newProject.title) return setError("Please provide a project name");
    if(!newProject.description) return setError("Please provide a project description");
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
        setNewProject({ title: '', description: '' });
        setError("");
        setProjects([...projects, projectData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {projects.length < 1 ? (
        <p className="text-center text-danger">
          Your team doesn't seem to have any active projects at the moment
        </p>
      ) : (
        <ProjectsList projects={projects} setProjects={setProjects} />
      )}
      <div className="new-project-container p-2">
        {error ? <p className="error">{error}</p> : null}
        <p className="mt-3 mb-2">Add a new project</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={newProject.title}
            onChange={(e) => setNewProject(project => ({...project, title: e.target.value}))}
            placeholder="Project Name"
            aria-label="Project Name"
            aria-describedby="basic-addon2"
            maxLength="30"
          />
          <input type="text"
          className="form-control"
            value={newProject.description}
            onChange={(e) => setNewProject(project => ({...project, description: e.target.value}))}
            placeholder="Project Description"
            aria-label="Project Description"
            aria-describedby="basic-addon2"
            maxLength="100"
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
