const express = require('express');
const { getProjects, createProject, deleteProject } = require('../controllers/projectsController.js');
const router = express.Router();

const verifyUserJWT = require('../middleware/verifyUserJWT.js');

router.get('/', verifyUserJWT, getProjects);
router.post('/', verifyUserJWT, createProject);
router.delete('/:projectId', verifyUserJWT, deleteProject);

module.exports = router;