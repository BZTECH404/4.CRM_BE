const Set = require('../models/set');

// Create a new set
const createSet = async (req, res) => {
    try {
        const { questions, isDisabled } = req.body;
        
        const newSet = new Set({
            questions,
            isDisabled
        });
        
        const savedSet = await newSet.save();
        
        res.status(201).json(savedSet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all sets
const getSets = async (req, res) => {
    try {
        const sets = await Set.find();
        
        res.status(200).json(sets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single set by ID
const getSetById = async (req, res) => {
    try {
        const setId = req.params.id;
        const set = await Set.findById(setId);
        
        if (!set) {
            return res.status(404).json({ message: 'Set not found' });
        }
        
        res.status(200).json(set);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a set by ID
const updateSet = async (req, res) => {
    try {
        const setId = req.params.id;
        const { questions, isDisabled } = req.body;
        
        const updatedSet = await Set.findByIdAndUpdate(setId, { questions, isDisabled }, { new: true });
        
        if (!updatedSet) {
            return res.status(404).json({ message: 'Set not found' });
        }
        
        res.status(200).json(updatedSet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a set by ID
const deleteSet = async (req, res) => {
    try {
        const setId = req.params.id;
        const deletedSet = await Set.findByIdAndDelete(setId);
        
        if (!deletedSet) {
            return res.status(404).json({ message: 'Set not found' });
        }
        
        res.status(200).json({ message: 'Set deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSet,
    getSets,
    getSetById,
    updateSet,
    deleteSet
};
