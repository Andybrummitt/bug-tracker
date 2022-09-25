const express = require('express');
const { getAllTickets, getProjectTickets, createTicket, deleteTicket } = require('../controllers/ticketsController.js');
const router = express.Router();

const verifyUserJWT = require('../middleware/verifyUserJWT.js');

router.get('/', verifyUserJWT, getAllTickets)
router.get('/:projectId', verifyUserJWT, getProjectTickets);
router.post('/:projectId', verifyUserJWT, createTicket);
router.delete('/:projectId/:ticketId', verifyUserJWT, deleteTicket);

module.exports = router;