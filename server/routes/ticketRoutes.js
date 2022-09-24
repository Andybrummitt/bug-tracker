const express = require('express');
const { getTickets, createTicket, deleteTicket } = require('../controllers/ticketsController.js');
const router = express.Router();

const verifyUserJWT = require('../middleware/verifyUserJWT.js');

router.get('/:projectId', verifyUserJWT, getTickets);
router.post('/:projectId', verifyUserJWT, createTicket);
router.delete('/:projectId/:ticketId', verifyUserJWT, deleteTicket);

module.exports = router;