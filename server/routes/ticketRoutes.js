const express = require('express');
const { getTickets, createTicket } = require('../controllers/ticketsController.js');
const router = express.Router();

const verifyUserJWT = require('../middleware/verifyUserJWT.js');

router.get('/:projectId', verifyUserJWT, getTickets);
router.post('/:projectId', verifyUserJWT, createTicket);

module.exports = router;