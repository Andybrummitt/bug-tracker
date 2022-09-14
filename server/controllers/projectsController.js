const ApiError = require("../error/apiError");
const Team = require("../models/Team");
const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");
const User = require("../models/User");

//  GET TEAM'S PROJECTS
//  GET /api/projects
const getProjects = asyncHandler(async (req, res, next) => {
  const { teamId } = req;
  const team = await Team.findOne({ _id: teamId });
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
  if (!newProject) {
    return next(ApiError.badRequest("Please provide a project name."));
  }

  //  FIND TEAM AND CHECK IF TEAM ALREADY HAS PROJECT WITH PASSED NAME
  const team = await Team.findOne({ _id: teamId });

  const existingProject = await Project.findOne({
    team: team._id,
    title: newProject,
  });

  if (existingProject) {
    return next(
      ApiError.badRequest("A project already exists with that name.")
    );
  }

  //  FIND USER AND CREATE PROJECT FROM SCHEMA
  const user = await User.findOne({ team: team._id, username });

  const project = await Project.create({
    title: newProject,
    team: team._id,
    createdBy: user._id,
  });

  //  UPDATE TEAM TO INCLUDE PROJECT CREATED
  team.projects.push(project);
  team.save();

  // SEND PROJECT IN RESPONSE
  res.json(project);
});

module.exports = {
  getProjects,
  createProject,
};
