const Correspondence = require('../models/correspondence');

// Create a new correspondence
const createCorrespondence = async (req, res) => {
  try {
  
    console.log(req.body)

    const correspondence = new Correspondence(req.body)
    
    const newCorrespondence = await correspondence.save();
    res.status(201).json({newCorrespondence});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get all correspondences
const getAllCorrespondences = async (req, res) => {
  try {
    // console.log("hi")
    const correspondences = await Correspondence.find();
    res.json(correspondences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single correspondence by ID
const getCorrespondenceById = async (req, res) => {
  try {
    const correspondence = await Correspondence.findById(req.params.id);
    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }
    res.json(correspondence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a correspondence by ID
const updateCorrespondence = async (req, res) => {
  try {
    const { name, project, description, next, previous, type } = req.body;
    const correspondence = await Correspondence.findById(req.params.id);
    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }
    correspondence.name = name;
    correspondence.project = project;
    correspondence.description = description;
    correspondence.next = next;
    correspondence.previous = previous;
    correspondence.type = type;
    const updatedCorrespondence = await correspondence.save();
    res.json(updatedCorrespondence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a correspondence by ID
const deleteCorrespondence = async (req, res) => {
  try {
    const correspondence = await Correspondence.findById(req.params.id);
    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }
    await correspondence.remove();
    res.json({ message: 'Correspondence deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Correspondence History
const createcorrhistory=async(req,res)=>{
  try{
  console.log(req.body)
  const {description,filename,file}=req.body
  const cid=req.params.id
  console.log(cid)
  let correspondences = await Correspondence.findById(cid);
  let fs=correspondences.files
  fs.push({
    description,filename,
    current:file
  })
  await Correspondence.findByIdAndUpdate(cid,correspondences,{new:true});
  
  }
  catch(err){
    console.log(err)
  }
  }
  
  const viewcorrhistory=async(req,res)=>{
    try{
    const cid=req.params.id
    let correspondences = await Correspondence.findById(cid);
    console.log(correspondences)

    }
    catch(err){
      console.log(err)
    }
    }

const updatecorrorder=async(req,res)=>{
  try{
    // console.log("hi")
    const cid=req.params.id
    let correspondences = await Correspondence.findById(cid);
    correspondences.files=req.body
    
    await Correspondence.findByIdAndUpdate(cid,correspondences,{new:true})
    res.status(200).json({message:"success"})
    console.log("success")
  }catch(error){
      console.log(error)

  }
}


// Add Reference
const AddReference=async(req,res)=>{
  try{
    // console.log("hi")
    const {refto}=req.body
    const cid=req.params.id
    let correspondence = await Correspondence.findById(cid);
    correspondence.refto=refto
    await Correspondence.findByIdAndUpdate(cid,correspondence,{new:true})
    AddReffromin(refto,cid,"refto")
    res.status(200).json({message:"success"})
    // console.log("success")
  }catch(error){
      console.log(error)

  }
}
// Add Enclosures
const AddEnclosures=async(req,res)=>{
  try{
    // console.log("hi")
    const {refto}=req.body
    const cid=req.params.id
    let correspondences = await Correspondence.findById(cid);
    correspondences.refto=refto
    console.log(correspondences)
    // correspondences.files=req.body
    // await Correspondence.findByIdAndUpdate(cid,correspondences,{new:true})
    // res.status(200).json({message:"success"})
    // console.log("success")
  }catch(error){
      console.log(error)

  }
}



// Should read all correspondence and check if own cid in that reffrom
// rewrite this mathod 
const AddReffromin=async(ref,cid,type)=>{
  try{
    console.log("h from refin")
    // const {refto}=req.body
    // const cid=req.params.id
    let str=cid.toString()
    console.log(str)
    if(type=="refto"){
      for(let i=0;i<ref.length;i++){
        let correspondence = await Correspondence.findById(ref[i]);
        let reffrom=correspondence.reffrom
        let flag=false
        for(let j=0;j<reffrom.length;j++){
          console.log((reffrom[j]._id).toString())
          if(((reffrom[j]._id).toString())==str){
            flag=true
          }
        }
        if(flag==false){
          reffrom.push(str)
          await Correspondence.findByIdAndUpdate(ref[i],correspondence,{new:true});
        }
      }
    }
    if(type=="enclose"){}
    // let correspondences = await Correspondence.findById(cid);
    // correspondences.refto=refto
    // console.log(correspondences)
    // correspondences.files=req.body
    // await Correspondence.findByIdAndUpdate(cid,correspondences,{new:true})
    // console.log("success")
  }catch(error){
      console.log(error)

  }
}







// Add Reference From
const AddReffrom=async(req,res)=>{
  try{
    // console.log("hi")
    if(type=="refto"){
      console.log()
    }
    const {refto}=req.body
    const cid=req.params.id
    let correspondences = await Correspondence.findById(cid);
    correspondences.refto=refto
    console.log(correspondences)
    // correspondences.files=req.body
    // await Correspondence.findByIdAndUpdate(cid,correspondences,{new:true})
    // res.status(200).json({message:"success"})
    // console.log("success")
  }catch(error){
      console.log(error)

  }
}




module.exports = {
  createCorrespondence,
  getAllCorrespondences,
  getCorrespondenceById,
  updateCorrespondence,
  deleteCorrespondence,
  createcorrhistory,
  viewcorrhistory,
  updatecorrorder,
  AddReference,
  AddReffrom
};
