import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ProjectsList = ({ projects }) => {
    console.log(projects)
  return (
    <div>
      <h4>Projects</h4>
      <ul>
        {projects.map((project) => {
          return (
            <Link key={uuidv4()} to={`/${project._id}`}>
              <li>{project.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectsList;
