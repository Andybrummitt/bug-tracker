const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refresh, logoutUser } = require('../controllers/usersController.js');
const { registerTeam, loginTeam, logoutTeam } = require('../controllers/teamsController.js');
const verifyTeamJWT = require('../middleware/verifyTeamJWT.js');

//  TEAM ROUTES
router.post('/team/register', registerTeam);
router.post('/team/login', loginTeam);
router.post('/team/logout', logoutTeam);

//  USER ROUTES
router.post('/user/register', verifyTeamJWT, registerUser);
router.post('/user/login', verifyTeamJWT, loginUser);
router.post('/user/refresh', refresh);
router.get('/user/logout', logoutUser);

module.exports = router;
