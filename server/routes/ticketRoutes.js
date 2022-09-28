const express = require('express');
const { getAllTickets, getProjectTickets, createTicket, deleteTicket } = require('../controllers/ticketsController.js');
const router = express.Router();

const verifyUserJWT = require('../middleware/verifyUserJWT.js');

router.get('/', verifyUserJWT, getAllTickets)
router.get('/:projectName', verifyUserJWT, getProjectTickets);
router.post('/:projectName', verifyUserJWT, createTicket);
router.delete('/:projectName/:ticketId', verifyUserJWT, deleteTicket);

module.exports = router;