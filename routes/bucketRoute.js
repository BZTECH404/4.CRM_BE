const express = require('express');
const router = express.Router();
const bucketController = require('../controller/bucketController');

router.post('/buckets/:userId', bucketController.createOrUpdateBucket);       // Create a new bucket
router.get('/buckets/all', bucketController.getBuckets);          // Get all buckets
router.get('/buckets/:userId', bucketController.getBucketById);   // Get a bucket by ID
router.put('/buckets/:userId/:bucketId', bucketController.updateBucket);
router.delete('/buckets/:userId/:bucketId/:taskId', bucketController.deleteTaskFromBucket);


module.exports = router;
