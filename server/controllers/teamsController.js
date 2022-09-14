const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const Team = require("../models/Team");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//  Register Team
//  POST /api/auth/team/register
const registerTeam = asyncHandler(async (req, res, next) => {
  const { teamName, password } = req.body;

  //  CHECK VALUES FROM REQ.BODY
  if (!teamName || !password) {
    return next(ApiError.badRequest("Please include all required fields."));
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
  const teamObj = { teamName, members: [], password: hashedPass };

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

const logoutTeam = asyncHandler(async (req, res, next) => {});

module.exports = {
  registerTeam,
  loginTeam,
  logoutTeam,
};
