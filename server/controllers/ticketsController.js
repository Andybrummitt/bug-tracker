const ApiError = require("../error/apiError");
const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

//  GET PROJECT TICKETS
//  GET /api/:projectId/tickets
const getTickets = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;
  const { teamId } = req;

  if (!projectId) {
    return next(ApiError.badRequest("Something wen't wrong."));
  }

  //  POPULATE TICKET OBJECT REF IDS AND SEND PROJECT TICKETS IN RESPONSE
  Project.findOne({ _id: projectId, team: teamId })
    .populate("tickets")
    .exec()
    .then((project) => {
      console.log(project);
      res.json(project.tickets);
    });
});

//  CREATE TICKET
//  POST /api/:projectId/tickets
const createTicket = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;
  const { newTicket } = req.body;
  const { teamId, username } = req;

  const user = await User.findOne({ username, team: teamId });

  if (!projectId || !user) {
    return next(ApiError.unauthorized("Unauthorized."));
  }

  if (!newTicket) {
    return next(ApiError.badRequest("Please include all ticket fields."));
  }

  const ticket = await Ticket.create({
    createdBy: {_id: user._id},
    project: {_id: projectId},
    title: newTicket.title,
    description: newTicket.description,
    completed: false,
    type: newTicket.type,
    priority: newTicket.priority,
  });

  const project = await Project.findOne({ _id: projectId });

  project.tickets.push({_id: ticket._id});
  project.save();

  user.tickets.push({_id: ticket._id});
  user.save();

  res.json(ticket);
});

//  DELETE TICKET
//  DELETE /api/:projectId/tickets
const deleteTicket = asyncHandler(async (req, res, next) => {
  const { projectId, ticketId } = req.params;
  const { teamId, username } = req;

  const user = await User.findOne({ username, team: teamId });

  if (!projectId || !user) {
    return next(ApiError.unauthorized("Unauthorized."));
  }

  if (!user.tickets.includes(ticketId)) {
    return next(
      ApiError.unauthorized(
        "You cannot remove a ticket which you did not create!"
      )
    );
  }

  await Ticket.findOneAndDelete({
    _id: ticketId,
    project: {_id: projectId},
    createdBy: {_id: user._id},
  });

  const project = await Project.findOne({ _id: projectId });
  project.tickets.pull(ticketId);
  project.save();

  user.tickets.pull(ticketId);
  user.save();

  res.json(ticketId);
});

module.exports = {
  getTickets,
  createTicket,
  deleteTicket,
};
