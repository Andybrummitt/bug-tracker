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

    if(!projectId){
        return next(ApiError.badRequest('Something wen\'t wrong.'))
    }
  
    //  POPULATE TICKET OBJECT REF IDS AND SEND PROJECT TICKETS IN RESPONSE  
    Project.findOne({_id: projectId, team: teamId})
      .populate('tickets')
      .exec()
      .then((project) => {
        console.log(project)
        res.json(project.tickets)
    })
  
  });

//  CREATE TICKET
//  POST /api/:projectId/tickets
const createTicket = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const { newTicket } = req.body;
    const { teamId, username } = req;

    const user = await User.findOne({username, teamId});

    if(!projectId || !user){
        return next(ApiError.badRequest('Something wen\'t wrong.'))
    };

    if(!newTicket){
        return next(ApiError.badRequest('Please include all ticket fields.'))
    }

    Project.findOne({ _id: projectId })

    const ticket = await Ticket.create({ 
        createdBy: user._id,
        project: projectId,
        title: newTicket.title,
        description: newTicket.description,
        completed: false,
        type: newTicket.type,
        priority: newTicket.priority
     });

     const project = await Project.findOne({ _id: projectId });

     project.tickets.push(ticket._id);
     project.save();

     res.json(ticket);
});

module.exports = {
    getTickets,
    createTicket
}