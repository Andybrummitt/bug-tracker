const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refresh, logoutUser, deleteUser } = require('../controllers/usersController.js');
const { registerTeam, loginTeam, deleteTeam } = require('../controllers/teamsController.js');
const verifyTeamJWT = require('../middleware/verifyTeamJWT.js');
const verifyUserJWT = require('../middleware/verifyUserJWT.js')

//  TEAM ROUTES
router.post('/team/register', registerTeam);
router.post('/team/login', loginTeam);
router.delete('/team', verifyUserJWT, deleteTeam);

//  USER ROUTES
router.post('/user/register', verifyTeamJWT, registerUser);
router.post('/user/login', verifyTeamJWT, loginUser);
router.post('/user/refresh', refresh);
router.get('/user/logout', verifyUserJWT, logoutUser);
router.delete('/user', verifyUserJWT, deleteUser);

module.exports = router;
