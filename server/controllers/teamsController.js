const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const Team = require("../models/Team");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");
const Ticket = require("../models/Ticket");

const isValid = (input) => {
  if (input.length >= 6 && input.length <= 15) {
    return true;
  }
  return false;
};

//  Register Team
//  POST /api/auth/team/register
const registerTeam = asyncHandler(async (req, res, next) => {
  const { teamName, password } = req.body;

  // const res1 = await mongoose.connection.db.dropCollection('projects')
  // const res2 = await mongoose.connection.db.dropCollection('teams')
  // const res3 = await mongoose.connection.db.dropCollection('tickets')
  // const res4 = await mongoose.connection.db.dropCollection('users')
  // console.log(res1, res2, res3, res4)
  // return;

  //  CHECK VALUES FROM REQ.BODY
  if (!teamName || !password) {
    return next(ApiError.badRequest("Please include all required fields."));
  }

  //  CHECK TEAM NAME AND PASSWORD IS VALID LENGTH
  if(!isValid(teamName) || !isValid(password)){
    return next(ApiError.badRequest("Team names and passwords must be between 6 and 15 characters."))
  }

  //  CHECK FOR DUPLICATES
  const duplicate = await Team.findOne({ teamName }).lean().exec();

  if (duplicate) {
    return next(ApiError.conflict("A team with that name already exists."));
  }

  //  HASH PASSWORD
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);

  //  CREATE TEAM AND STORE IN DB
  const teamObj = { teamName, password: hashedPass };

  const team = await Team.create(teamObj);

  //  LOG INTO TEAM PORTAL
  if (team) {
    loginTeam(req, res, next);
  } else {
    return next(ApiError.badRequest("Failed to create team."));
  }
});

//  Login Team
//  POST /api/auth/team/login
const loginTeam = asyncHandler(async (req, res, next) => {
  const { teamName, password } = req.body;

  //  CHECK VALUES FROM REQ.BODY
  if (!teamName || !password) {
    return next(ApiError.badRequest("Please include all required fields."));
  }

  //  CHECK TEAM EXISTS IN DB
  const team = await Team.findOne({ teamName }).exec();

  if (!team) {
    return next(ApiError.unauthorized("Wrong team name or password."));
  }

  //  CHECK PASSWORD MATCHES DB
  const match = bcrypt.compare(password, team.password);

  if (!match) {
    return next(ApiError.unauthorized("Wrong team name or password."));
  }

  //  SEND ACCESS TOKEN
  const accessToken = jwt.sign(
    { TeamName: teamName },
    process.env.TEAM_ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  res.json({ accessToken, teamName });
});

const deleteTeam = asyncHandler(async (req, res, next) => {
  const { teamId, username } = req;

  //  CHECK IF TEAM
  const team = await Team.findOne({_id: teamId});
  if(!team){
      return next(ApiError.internalError('Something wen\'t wrong'));
  }

  //  CHECK IF USER
  const user = await User.findOne({name: username, team: { _id: teamId }});
  if(!user){
      return next(ApiError.badRequest('User does not exist'))
  }

  //  DELETE USERS
  await User.deleteMany({team: teamId});

  //  DELETE TEAM
  await Team.deleteOne({ _id: teamId });

  //  DELETE PROJECTS
  await Project.deleteMany({team: teamId});

  //  DELETE TICKETS
  await Ticket.deleteMany({team: teamId});

  res.json(teamId)

})

module.exports = {
  registerTeam,
  loginTeam,
  deleteTeam
};
