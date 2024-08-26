const Task = require('../models/tasksmodel');
const mongoose = require('mongoose');
const TaskHistory = require('../models/taskHistory');


const addTaskHistory = async (req, res) => {
    try {
      ////////////////console.log(req.body);
      const taskId = req.params.id; // Assuming taskId is passed in the URL params
      const { taskDescription } = req.body;
  
      // Create a new task history entry
      const newTaskHistory = new TaskHistory({
        taskDescription,
        taskId
      });
     
      // Save the new task history entry
      await newTaskHistory.save();
  
      // FIncrement no of task
      let task1=await Task.findById(taskId)

      await Task.findByIdAndUpdate(taskId,{nooftask:task1.nooftask+1})



      res.status(201).json({ message: "Task history added successfully" });
    } catch (error) {
      //console.error("Error adding task history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // const getAllTaskHistories = async (req, res) => {
  //   try {
  //     const taskId = req.params.id; // Assuming taskId is passed in the URL params
  //     ////////////////console.log(taskId);
  //     // Find the task by its ID and populate its taskHistory field to get all associated task histories
  //     const task = await Task.findById(taskId)
  //     // const task = await Task.findById(taskId).populate('taskHistory');

  //     ////////////////console.log(task);
  //     if (!task) {
  //       return res.status(404).json({ message: "Task not found" });
  //     }
  
  //     // Extract task histories from the task object
  //     const taskHistories = task.taskHistory;
  //     ////////////////console.log(typeof(taskHistories));
  //     let temp=[]
  //     for(let i=0;i<taskHistories.length;i++){
  //         temp[i]=taskHistories[i]
  //     }
  
  //     res.status(200).json( temp );
  //   } catch (error) {
  //     //console.error("Error fetching task histories:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // };

  const getAllTaskHistories = async (req, res) => {
      try {
        //////////////console.log(req.body);
        const taskId = req.params.id; // Assuming taskId is passed in the URL params
        ////////////////console.log(taskId);
        // Find the task by its ID and populate its taskHistory field to get all associated task histories
        const task = await TaskHistory.find({taskId})
        // const task = await Task.findById(taskId).populate('taskHistory');
        //////////////console.log(task);
        //////////////console.log("----------")
       
    
        res.status(200).json(task);
      } catch (error) {
        //console.error("Error fetching task histories:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
  

  const getTaskHistoryById = async (req, res) => {
    try {
      const taskHistoryId = req.params.id; // Assuming taskHistoryId is passed in the URL params
      // //////////////console.log(taskHistoryId,)
      // Find the task history by its ID
      const taskHistory = await TaskHistory.findById(taskHistoryId);
  
      if (!taskHistory) {
        return res.status(404).json({ message: "Task history not found" });
      }
  
      res.status(200).json({ taskHistory });
    } catch (error) {
      //console.error("Error fetching task history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const deleteTaskHistory = async (req, res) => {
    try {
      // //////////////console.log(req.body);
      const taskHistoryId = req.params.id; // Assuming taskHistoryId is passed in the URL params
      // //////////////console.log(taskHistoryId)
      // Find the task history by its ID
      const taskHistory = await TaskHistory.findById(taskHistoryId);
  
      if (!taskHistory) {
        return res.status(404).json({ message: "Task history not found" });
      }
      const taskHistory12 =await TaskHistory.findByIdAndDelete(taskHistoryId);
      

      // Reducing the Tasks
      let task1=await Task.findById(taskHistory.taskId)

      await Task.findByIdAndUpdate(taskHistory.taskId,{nooftask:task1.nooftask-1})

      res.status(200).json({ taskHistory12 });
    } catch (error) {
      //console.error("Error fetching task history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  const updateTaskHistory = async (req, res) => {
    try {
      //////////////console.log(req.body);
      const taskHistoryId = req.params.id; // Assuming taskHistoryId is passed in the URL params
      const { taskDescription } = req.body;
  
      // Find the task history by its ID
      let taskHistory = await TaskHistory.findById(taskHistoryId);
  
      if (!taskHistory) {
        return res.status(404).json({ message: "Task history not found" });
      }
  
      // Update task history fields
      taskHistory.taskDescription = taskDescription;
  
      // Save the updated task history
      taskHistory = await taskHistory.save();
  
      res.status(200).json({ taskHistory });
    } catch (error) {
      //console.error("Error updating task history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = { addTaskHistory,updateTaskHistory,getAllTaskHistories,getTaskHistoryById,deleteTaskHistory };
