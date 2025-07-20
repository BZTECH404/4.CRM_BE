const Bucket = require('../models/bucketModel');
const moment = require('moment');
const Task = require('../models/tasksmodel');
const User = require('../models/userModel');
const mongoose = require('mongoose'); // Import mongoose

// Create or update a bucket
exports.createOrUpdateBucket = async (req, res) => {
    const { userId } = req.params;
    const { date, tasks } = req.body;
    ////console.log(req.body)
    // Check if the required fields are provided
    if (!date || !userId) {
        return res.status(400).json({ error: 'Date and userId are required.' });
    }
    console.log(userId)
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Convert date to start of the day (ignoring time)
        const bucketDate = new Date(date).setHours(0, 0, 0, 0);

        // Check if the bucket for the given date already exists for this user
        

        let existingBucket = await Bucket.findOne({
            user: userId,
            date: { $eq: new Date(bucketDate) }
        }).populate('tasks');

        if (existingBucket) {
            // If the bucket exists, check if tasks already exist in the bucket
            if (tasks && Array.isArray(tasks)) {
                for (let taskId of tasks) {
                    if (existingBucket.tasks.some(task => task._id.toString() === taskId)) {
                        return res.status(400).json({ error: `Task ${taskId} already exists in the bucket.` });
                    }
                }
                existingBucket.tasks.push(...tasks);
            }
            await existingBucket.save();
            return res.json({ message: 'Tasks added to existing bucket', bucket: existingBucket });
        } else {
            // If the bucket doesn't exist, create a new one with the provided tasks
            const newBucket = new Bucket({
                user: userId,
                date: bucketDate,
                tasks: tasks || [],  // Default to an empty array if no tasks are provided
            });
            await newBucket.save();
            return res.json({ message: 'New bucket created and tasks added', bucket: newBucket });
        }
    } catch (error) {
        console.log('Error adding/updating bucket:', error);
        res.status(500).json({ error: 'An error occurred while adding/updating the bucket.' });
    }
};


// Get all buckets
exports.getBuckets = async (req, res) => {
    try {
        // Find all buckets and populate tasks and user data if necessary
        const buckets = await Bucket.find().populate('tasks').populate('user');

        if (!buckets.length) {
            return res.status(404).json({ message: 'No buckets found' });
        }
        //////console.log(buckets)
        for(let i=0;i<buckets.length;i++){
            //////console.log(buckets[i].tasks)
        }
        // Return the found buckets
        res.json(buckets);
    } catch (error) {
        ////console.error('Error fetching all buckets:', error);
        res.status(500).json({ error: 'An error occurred while fetching buckets.' });
    }
};

// Get a bucket by ID
exports.getBucketById = async (req, res) => {
    const { userId } = req.params;
    //////console.log('Received User ID:', userId)

    try {
        // First, find the user by ID
        const user = await User.findById(userId);
        //////console.log("userId", user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Then, find buckets associated with the user
        const buckets = await Bucket.find({ user: userId }).populate('tasks');

        if (!buckets.length) {
            return res.status(404).json({ message: 'No buckets found for this user' });
        }

        // Return the found buckets for the user
        res.json(buckets);
    } catch (error) {
        ////console.error('Error fetching buckets by user ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching the buckets.' });
    }
};

exports.updateBucket = async (req, res) => {
    const { userId, bucketId } = req.params; // Assume bucketId is part of the URL parameters
    let { date, tasks } = req.body;
    const uniqueTasks = new Set(tasks);
    tasks=Array.from(uniqueTasks)
    //console.log(tasks)
    // Check if the required fields are provided
    if (!tasks || !Array.isArray(tasks)) {
        return res.status(400).json({ error: 'Tasks are required and should be an array.' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the bucket by ID and ensure it belongs to the user
        const existingBucket = await Bucket.findOne({
            _id: bucketId,
            user: userId,
        }).populate('tasks');

        if (!existingBucket) {
            return res.status(404).json({ error: 'Bucket not found for this user' });
        }
        //console.log(existingBucket.tasks)
        // Update the tasks in the existing bucket
        existingBucket.tasks = tasks; // Replace existing tasks with the new ones
        await existingBucket.save();

        return res.json({ message: 'Bucket updated successfully', bucket: existingBucket });
    } catch (error) {
        ////console.error('Error updating bucket:', error);
        res.status(500).json({ error: 'An error occurred while updating the bucket.' });
    }
};


exports.deleteTaskFromBucket = async (req, res) => {
    const { userId, bucketId, taskId } = req.params;
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the bucket by ID and ensure it belongs to the user
        const existingBucket = await Bucket.findOne({
            _id: bucketId,
            user: userId,
        });

        if (!existingBucket) {
            return res.status(404).json({ error: 'Bucket not found for this user' });
        }

        // Check if the task exists in the bucket's tasks array
        const taskIndex = existingBucket.tasks.indexOf(taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found in the bucket' });
        }

        // Remove the task from the tasks array without deleting the actual Task
        existingBucket.tasks.splice(taskIndex, 1);
        await existingBucket.save();

        return res.json({ message: 'Task deleted from bucket successfully', bucket: existingBucket });
    } catch (error) {
        console.error('Error deleting task from bucket:', error);
        res.status(500).json({ error: 'An error occurred while deleting the task from the bucket.' });
    }
};
