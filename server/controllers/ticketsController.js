const ApiError = require("../error/apiError");
const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");
const User = require("../models/User");
const Ticket = require("../models/Ticket");


//  GET ALL TICKETS
//  GET /api/tickets
const getAllTickets = asyncHandler(async (req, res, next) => {
  const { teamId } = req;
  const tickets = await Ticket.find({ team: { _id: teamId } }).exec();
  res.json(tickets)
})

//  GET PROJECT TICKETS
//  GET /api/tickets/:projectName
const getProjectTickets = asyncHandler(async (req, res, next) => {
  const { projectName } = req.params;
  const { teamId } = req;

  if (!projectName) {
    return next(ApiError.badRequest("Something wen't wrong."));
  }

  const project = await Project.findOne({title: projectName, team: teamId});

  if(!project){
    return next(ApiError.notFound("Project does not exist."))
  }

  //  POPULATE TICKET OBJECT REF IDS AND SEND PROJECT TICKETS IN RESPONSE
  Project.findOne({ title: projectName, team: teamId })
    .populate("tickets")
    .exec()
    .then((project) => {
      res.json(project.tickets);
    })
    .catch(err => next(ApiError.badRequest("Something wen't wrong")));
});

//  CREATE TICKET
//  POST /api/:projectName/tickets
const createTicket = asyncHandler(async (req, res, next) => {
  const { projectName } = req.params;
  const { newTicket } = req.body;
  const { teamId, username } = req;

  const user = await User.findOne({ username, team: teamId });

  const project = await Project.findOne({ title: projectName, team: teamId })

  if (!projectName || !user) {
    return next(ApiError.unauthorized("Unauthorized."));
  }

  if (!newTicket) {
    return next(ApiError.badRequest("Please include all ticket fields."));
  }

  const ticket = await Ticket.create({
    createdBy: {_id: user._id},
    project: {_id: project._id},
    title: newTicket.title,
    description: newTicket.description,
    completed: false,
    team: { _id: teamId },
    type: newTicket.type,
    priority: newTicket.priority,
  });

  project.tickets.push({_id: ticket._id});
  project.save();

  user.tickets.push({_id: ticket._id});
  user.save();

  res.json(ticket);
});

//  DELETE TICKET
//  DELETE /api/:projectName/tickets
const deleteTicket = asyncHandler(async (req, res, next) => {
  const { projectName, ticketId } = req.params;
  const { teamId, username } = req;

  const user = await User.findOne({ username, team: teamId });
  const project = await Project.findOne({ title: projectName, team: teamId })

  if (!projectName || !user) {
    return next(ApiError.unauthorized("Unauthorized."));
  }

  await Ticket.findOneAndDelete({
    _id: ticketId,
    project: {_id: project._id},
    createdBy: {_id: user._id},
  });

  project.tickets.pull(ticketId);
  project.save();

  user.tickets.pull(ticketId);
  user.save();

  res.json(ticketId);
});

module.exports = {
  getAllTickets,
  getProjectTickets,
  createTicket,
  deleteTicket,
};
