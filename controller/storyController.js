// const Story = require('../models/storyModel');

// const createStory = async (req, res) => {
//     try {
//         const newStory = await Story.create(req.body);
//         res.status(201).json(newStory);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getAllStory = async (req, res) => {
//     try {
//         const stories = await Story.find({ isDisabled: false });
//         res.status(200).json(stories);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getStories = async (req, res) => {
//     try {
//         const isDisabled = req.body.isDisabled === undefined ? false : req.body.isDisabled;
//         const stories = await Story.find({ isDisabled });
//         res.status(200).json(stories);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getStoryById = async (req, res) => {
//     try {
//         const story = await Story.findById(req.params.id);
//         if (!story) {
//             return res.status(404).json({ message: 'Story not found' });
//         }
//         res.status(200).json(story);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const updateStory = async (req, res) => {
//     try {
//         const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedStory) {
//             return res.status(404).json({ message: 'Story not found' });
//         }
//         res.status(200).json(updatedStory);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const deleteStory = async (req, res) => {
//     try {
//         const story = await Story.findById(req.params.id);
//         if (!story) {
//             return res.status(404).json({ message: 'Story not found' });
//         }
//         const deletedStory = await Story.findByIdAndUpdate(req.params.id, { isDisabled: true }, { new: true });
//         res.status(200).json({ message: 'Story deleted successfully', deletedStory });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     createStory,
//     getAllStory,
//     getStoryById,
//     updateStory,
//     deleteStory,
//     getStories
// };
