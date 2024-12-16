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
router.put('/update/:pid/:fid', projectController.updateProjectfiles);
router.put('/update-order/:pid',projectController.updateOrder)
router.delete('/files/:pid/:fid',projectController.deletefiles)
router.delete('/:id', isAuthenticated,authorizeRoles('admin'),projectController.deleteProject);

// Create a new story
router.post('/stories/:id', projectController.createStory);

// Get all stories for a project
router.get('/stories/:id', projectController.getStories);

// Update a story by ID
router.put('/updatestories/:pid/:sid', projectController.updateStory);

// Delete a story by ID
router.delete('/stories/:pid/:sid', projectController.deleteStory);

// Update the order of stories
router.put('/stories/:pid', projectController.updateStoryOrder);


module.exports = router;
