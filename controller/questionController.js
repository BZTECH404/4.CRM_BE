const Question = require('../models/questions'); // Adjust the path as necessary

// Controller function to create a new question
const createQuestion = async (req, res) => {
    try {
        const newQuestion = await Question.create(req.body);
        res.status(201).json(newQuestion);
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all questions
const getAllQuestions = async (req, res) => {
    try {
      
        const questions = await Question.find({ isDisabled: false });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 
const getQuestions = async (req, res) => {
    try {
        //console.log(req.body)
        if(req.body.isDisabled==undefined){
            req.body.isDisabled=false
        }
        const questions = await Question.find({ isDisabled: req.body.isDisabled });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a single question by ID
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update an existing question
const updateQuestion = async (req, res) => {
    try {
        // //console.log(req.params.id)
        console.log(req.body)
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete a question
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        const deletedQuestion = await Question.findByIdAndUpdate(req.params.id, { isDisabled: true }, { new: true });
        res.status(200).json({ message: 'Question deleted successfully', deletedQuestion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    getQuestions
};
