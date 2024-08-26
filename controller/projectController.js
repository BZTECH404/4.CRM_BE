// controllers/projectController.js
const Project = require('../models/projectModel');
const Question = require('../models/questions'); // Adjust the path as necessary

async function getAllProjects(req, res) {
  try {
    const { company, status, isDisabled, type, id, people } = req.body
    // console.log(req.body)
    //console.log(req.body)
    const projectFilter = {};
    if (company) {
      projectFilter.company = company;
    }
    if (status) {
      projectFilter.status = status;
    }
    if (type) {
      projectFilter.type = type;
    }
    if (id) {
      projectFilter._id = id
    }
    projectFilter.isDisabled = isDisabled


    const projects = await Project.find(projectFilter);
    //   console.log(req.body)
    

    if (people && people.length!=0) {
      let peopleIds = people.map((value) => value.id); // Extracting IDs from people array

      let mySet = new Set(); // Initialize a Set to store unique projects
      
      for (let i = 0; i < projects.length; i++) {
        let temp = projects[i].users;
        
        for (let j = 0; j < temp.length; j++) {
          if (peopleIds.includes(temp[j].toString())) { // Check if ID exists in peopleIds array
            mySet.add(projects[i]); // Add the project to the Set (unique projects)
            break; // Exit the inner loop once a match is found
          }
        }
      }
      
      let myArray = Array.from(mySet); // Convert Set to Array
      
      // console.log(myArray);
      res.json(myArray);
      
    }
    else {
      // console.log("second")
      res.json(projects);
     
    }
    // //////////////console.log(projects)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProjectById(req, res) {
  const id = req.params.id;
  try {
    const project = await Project.findById(id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createProject(req, res) {
  const newProject = req.body;
  try {
    const createdProject = await Project.create(newProject);
    res.json({ message: 'Project created successfully', project: createdProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProject(req, res) {
  ////////////////console.log('updateProject');
  const id = req.params.id;
  const newData = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, newData);
    if (updatedProject) {
      res.json({ message: 'Project updated successfully', project: updatedProject });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteProject(req, res) {
  ////////////////console.log('deleteProject');
  const id = req.params.id;
  try {
    const proj1 = await Project.findById(id)
    const deletedProject = await Project.findByIdAndUpdate(id, { isDisabled: !proj1.isDisabled });
    if (deletedProject) {
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// async function setallfalse(req, res) {
//   ////////////////console.log('deleteProject');

//   try {
//     const proj1 = await Project.find()
//     for(let i=0;i<proj1.length;i++){
//       await Project.findByIdAndUpdate(proj1[i]._id, { isDisabled: false });
//   } 
// }catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
async function addQuestions(req, res) {
  ////////////////console.log('updateProject');
  const id = req.params.id;
  console.log(id)
  
  // const newData = req.body;
  try {

    let pro = await Project.findById(id);
    let questions=pro.questions
    let newquestions=req.body.questions
    // let questions
    console.log(questions[0],newquestions[0])
    for(let i=0;i<questions.length;i++){
      if(questions[i].answer!=newquestions[i].answer){
        (newquestions[i].prevanswer).push(questions[i].answer)
        // console.log(questions[i].answer,newquestions[i].answer,newquestions[i].prevanswer)

      }
    }
    // console.log(newquestions)
    // console.log(questions)
    let pro1 = await Project.findByIdAndUpdate(id, req.body, { new: true });
    //console.log("hi")
    //console.log(pro,req.body)
    //console.log(pro1)
    if (pro1) {
      res.json({ message: 'Project updated successfully', project: pro1 });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: error.message });
  }
}
async function importQuestions(req, res) {
  // First call all questions
  let questions = await Question.find({ isDisabled: false });

  // check the exisiting projects if it already has the same questions
  let pro = await Project.findById(req.params.id);
  let que = pro.questions

  for (let i = 0; i < questions.length; i++) {
    flag = true
    for (let j = 0; j < que.length; j++) {
      if (que[j].question != undefined) {
        if ((que[j].question).toString() == (questions[i]._id).toString()) {
          // //console.log("same")
          flag = false
          break
        }
      }
    }

    if (flag == true) {
      que.push({
        question: questions[i]._id,
        answer: ""
      })
    }

  }

  try {
    let pro1 = await Project.findByIdAndUpdate(req.params.id, { questions: que })
    res.json({ message: 'Project updated successfully', project: pro1 });

  } catch (error) {
    // //console.log(error)
    res.status(500).json({ error: error.message });
  }
}

async function addfiles(req, res) {
  const {id,filename,date,url}=req.body
  try {
    let proj1 = await Project.findById(id)
    let last=proj1.files.length
    let files=proj1.files
    console.log(last,"last")
    console.log(id,filename,date,url)
    console.log(files)
    files.push({
      order:last,
      filename:filename,
      current:url
    })
    // proj1.files=files
    await Project.findByIdAndUpdate(id,proj1,{new:true})
    res.status(200).json({message:"succesful"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
}


async function deletefiles(req,res){
  let pid=req.params.pid
  let fid=req.params.fid
  try{
  let proj1 = await Project.findById(pid)
  let files=proj1.files
  console.log(files)
  for(let i=0;i<files.length;i++){
    if((files[i]._id).toString()==fid){
      // console.log("here")
      files[i].isDisabled=true
    }
  }

  await Project.findByIdAndUpdate(pid,proj1,{new:true})
}
  catch(err){
    console.log(err)
  }
}


async function enablefiles(req,res){
  let pid=req.params.pid
  let fid=req.params.fid
  try{
  let proj1 = await Project.findById(pid)
  let files=proj1.files
  // console.log(files)
  for(let i=0;i<files.length;i++){
    if((files[i]._id).toString()==fid){
      // console.log("here")
      files[i].isDisabled=false
    }
  }
  await Project.findByIdAndUpdate(pid,proj1,{new:true})
}
  catch(err){
    console.log(err)
  }
}
async function updateorder(req,res){
  let pid=req.params.pid
  
  console.log(req.body,pid)
//   try{
//   let proj1 = await Project.findById(pid)
//   let files=proj1.files
//   console.log(files)
//   for(let i=0;i<files.length;i++){
//     if((files[i]._id).toString()==fid){
//       // console.log("here")
//       files[i].isDisabled=true
//     }
//   }

//   await Project.findByIdAndUpdate(pid,proj1,{new:true})
// }
//   catch(err){
//     console.log(err)
//   }
}




module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addQuestions,
  importQuestions,
  addfiles,
  deletefiles,
  enablefiles,
  updateorder
};
