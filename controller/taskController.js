const Task = require('../models/tasksmodel');
const mongoose = require('mongoose');
const TaskHistory = require('../models/taskHistory');

// Controller for creating a new task
const createTask = async (req, res) => {
  try {
    ////////////////console.log(req.body)
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller for fetching all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for fetching a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a task
const updateTask = async (req, res) => {
  try {
    ////////////////console.log(req.body)
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller for deleting a task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getAllTasksForUser = async (req, res) => {
  try {
    // const userId = mongoose.Types.ObjectId(req.params.userId); // Assuming userId is available in the request parameters
    const userId = req.params.id// Assuming userId is available in the request parameters

    const allTasks = await Task.find();
    ////////////////console.log(userId)
    const tasksForUser=[]
    for(let i=0;i<allTasks.length;i++){
      if(((allTasks[i].assignTaskTo[0]).toString())?.includes(userId)){
        tasksForUser.push(allTasks[i])
      }
    }
    ////////////////console.log(tasksForUser)    
    res.status(200).json(tasksForUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markTaskAsComplete = async (req, res) => {
  try {
    const taskId = req.params.id; // Assuming taskId is available in the request parameters

    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the taskCompleted field to true
    if(task.taskCompleted == true){
    task.taskCompleted = false;
    task.CompletedAt=null
    }else{
    task.taskCompleted = true;
    task.CompletedAt=Date.now()

    }
    // Save the updated task
    await task.save();

    res.status(200).json({ message: 'Task marked as complete', task: task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllIncompleteTasks = async (req, res) => {
  try {
    
    // Find all tasks where taskCompleted is false
    const userId = req.params.id
    const allTasks = await Task.find({ taskCompleted: false });
    const tasksForUser=[]
  //   for(let i=0;i<allTasks.length;i++){
  //     if((allTasks[i].assignTaskTo[0])){
  //     if(((allTasks[i].assignTaskTo[0]).toString())?.includes(userId)){
  //       tasksForUser.push(allTasks[i])
  //     }
  //   }
  // }
  for(let i=0;i<allTasks.length;i++){
    let temp=allTasks[i].assignTaskTo
    for(let j=0;j<temp.length;j++){
    if((temp[j]).toString()==userId){
      tasksForUser.push(allTasks[i])
    }
  }
}
    ////////////////console.log(tasksForUser)    
    res.status(200).json(tasksForUser);
  } catch (error) {
    //////////////console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const getAllCompletedTasks = async (req, res) => {
  try {
    // Find all tasks where taskCompleted is true
    const userId = req.params.id
    const allTasks = await Task.find({ taskCompleted: true });
    const tasksForUser=[]
    //////////////console.log(userId,allTasks)
    // for(let i=0;i<allTasks.length;i++){
    //   if((allTasks[i].assignTaskTo[0])){
    //   if(((allTasks[i].assignTaskTo[0]).toString())?.includes(userId)){
    //     tasksForUser.push(allTasks[i])
    //   }
    // }
    // }
    for(let i=0;i<allTasks.length;i++){
      let temp=allTasks[i].assignTaskTo
      for(let j=0;j<temp.length;j++){
      if((temp[j]).toString()==userId){
        tasksForUser.push(allTasks[i])
      }
    }
  }
    ////////////////console.log(tasksForUser)    
    res.status(200).json(tasksForUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findTasksByFilter = async (req, res) => {
  try {
    
    const {projectid,taskCompleted,assignTaskTo}=req.body
    // //////////////console.log(assignTaskTo)
    //////////////console.log(req.body)
    const tasksFilter = {};
    if(projectid){
      tasksFilter.projectid = projectid;
    }
    if(taskCompleted){
      tasksFilter.taskCompleted = taskCompleted;
    }
    const tasks = await Task.find(tasksFilter);
  //  //////////////console.log(tasks)
  let temp=tasks
  if(assignTaskTo){
  temp=[]
    for(let i=0;i<tasks.length;i++){
      for(let j=0;j<tasks[i].assignTaskTo.length;j++){
      if(((tasks[i].assignTaskTo[j]).toString())?.includes(assignTaskTo[0])){
        temp.push(tasks[i])
      }
    }
    }
  }
    // //////////////console.log(tasks)
    // Assuming filterKey and filterValue are available in the request body
    // if (!filterKey || !filterValue) {
    //   return res.status(400).json({ message: 'Filter key and value are required' });
    // }

    // Find tasks based on the provided filter key and value
    
    ////////////////console.log(tasks)

    res.status(200).json(temp);
  } catch (error) {
    //////////////console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id; // Assuming taskId is available in the request parameters

    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const numberoftask=async(req,res)=>{
try{
  //////console.log("hi")
  obj={}
  const taskHistory = await TaskHistory.find()
  for(let i=0;i<taskHistory.length;i++){
    if((taskHistory[i].taskId)){
    if(obj[(taskHistory[i].taskId)?.toString()]==undefined){
      obj[(taskHistory[i].taskId)?.toString()]=1
    }else{
      obj[(taskHistory[i].taskId)?.toString()]++
    }

  }
}
  const allTasks = await Task.find();
  // //////console.log(allTasks[0])
  // //////console.log(allTasks)
  for(let i=0;i<allTasks.length;i++){
    // //////console.log(obj[allTasks[i]._id])
    if(obj[(allTasks[i]._id).toString()]){
      await Task.findByIdAndUpdate((allTasks[i]._id).toString(),{nooftask:obj[(allTasks[i]._id).toString()]})
      // //////console.log(res)
    } 
  }
  res.status(200).json(obj)
}catch(error){
  //////console.log(error)
}
 
// for(let i=0;i<task.length;i++){

// }

}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getAllTasksForUser,markTaskAsComplete,getAllIncompleteTasks,getAllCompletedTasks,findTasksByFilter,numberoftask};
