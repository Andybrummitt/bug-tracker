const ApiError = require("../error/apiError");
const Team = require("../models/Team");
const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

//  GET TEAM'S PROJECTS
//  GET /api/projects
const getProjects = asyncHandler(async (req, res, next) => {
  const { teamId } = req;

  console.log(teamId)
  const team = await Team.findOne({ _id: teamId });
  console.log(team)
  if (!team) {
    return next(ApiError.internalError("Something wen't wrong"));
  }

  //  POPULATE PROJECT OBJECT REF IDS AND SEND TEAM PROJECTS IN RESPONSE
  Team.findOne({ _id: teamId })
    .populate("projects")
    .exec()
    .then((team) => {
      res.json(team.projects);
    });
});

//  CREATE NEW PROJECT
//  POST /api/projects
const createProject = asyncHandler(async (req, res, next) => {
  const { newProject } = req.body;
  const { teamId, username } = req;
  console.log(newProject);
  
  if (!newProject.title || !newProject.description) {
    return next(ApiError.badRequest("Please provide a project name and description."));
  }

  //  FIND TEAM AND CHECK IF TEAM ALREADY HAS PROJECT WITH PASSED NAME
  const team = await Team.findOne({ _id: teamId });

  const existingProject = await Project.findOne({
    team: { _id: team._id },
    title: newProject.title,
  });

  if (existingProject) {
    return next(
      ApiError.badRequest("A project already exists with that name.")
    );
  }

  //  FIND USER AND CREATE PROJECT FROM SCHEMA
  const user = await User.findOne({ team: { _id: team._id }, username });

  const project = await Project.create({
    title: newProject.title,
    description: newProject.description,
    team: { _id: team._id },
    createdBy: { _id: user._id },
  });

  //  UPDATE TEAM TO INCLUDE PROJECT CREATED
  team.projects.push(project);
  team.save();

  // SEND PROJECT IN RESPONSE
  res.json(project);
});

//  DELETE /api/projects/:projectId
const deleteProject = asyncHandler(async (req, res, next) => {
  const { teamId, username } = req;
  const { projectId } = req.params;

  //  FIND USER
  const user = await User.findOne({ team: { _id: teamId }, username });

  //  FIND PROJECT
  const project = await Project.findOne({ _id: projectId });

  //  DELETE TICKET DOCUMENTS
  for(let ticket of project.tickets){
    await Ticket.findOneAndDelete({
      _id: ticket._id,
      project: {_id: projectId},
      createdBy: {_id: user._id},
    });
  }

  await Project.findOneAndDelete({_id: projectId});

  res.json(projectId);
});

module.exports = {
  getProjects,
  createProject,
  deleteProject,
};
