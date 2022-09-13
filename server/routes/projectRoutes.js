const express = require('express');
const { getProjects, createProject } = require('../controllers/projectsController.js');
const router = express.Router();

const verifyUserJWT = require('../middleware/verifyUserJWT.js');

router.get('/', verifyUserJWT, getProjects);
router.post('/', verifyUserJWT, createProject);

module.exports = router;