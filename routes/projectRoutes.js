// routes/projectRoutes.js
const express = require('express');
const projectController = require('../controller/projectController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

const router = express.Router();

router.put('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/create', projectController.createProject);
router.put('/addquestions/:id', projectController.addQuestions);
router.put('/imquestion/:id', projectController.importQuestions);
router.put('/addfiles/:id',projectController.addfiles)
router.put('/:id', projectController.updateProject);
router.put('/files/:pid',projectController.updateorder)
router.delete('/files/:pid/:fid',projectController.deletefiles)
router.delete('/:id', isAuthenticated,authorizeRoles('admin'),projectController.deleteProject);


module.exports = router;