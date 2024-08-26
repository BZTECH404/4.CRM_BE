const express = require('express');
const router = express.Router();
const correspondenceController = require('../controller/correspondenceController');

// Get all correspondences
router.get('/', correspondenceController.getAllCorrespondences);
// View files in Correspondence 
router.get('/file/:id',correspondenceController.viewcorrhistory)
// Create a new correspondence
router.post('/create', correspondenceController.createCorrespondence);
// Create a node in correspondence
router.post('/node/:id', correspondenceController.createcorrhistory);

// Get a single correspondence by ID
router.get('/correspondences/:id', correspondenceController.getCorrespondenceById);

//Update the References of a Correspondence
router.put('/updateref/:id',correspondenceController.AddReference)

//Update the References of a Correspondence
router.put('/updateenclosure/:id',correspondenceController.AddReference)

//Update the References/Enclosures from a Correspondence
router.put('/updatefrom/:id',correspondenceController.AddReffrom)

// Update the correspondence order 
router.put('/update/:id',correspondenceController.updatecorrorder)


// Update a correspondence by ID
router.put('/correspondences/:id', correspondenceController.updateCorrespondence);

// Delete a correspondence by ID
router.delete('/correspondences/:id', correspondenceController.deleteCorrespondence);

module.exports = router;
