const Contact = require('../models/contactModel');
// Controller functions

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const {project,type,isDisabled}=req.body
    ////////////////////console.log(req.body)
    let projectfilter={}
    projectfilter.isDisabled=false
    if(type){
      projectfilter.type=type
    }
    if(isDisabled==true){
      projectfilter.isDisabled=true
    }
    //console.log(projectfilter)
    // deletecontacts()
    const contacts = await Contact.find(projectfilter);
    // //console.log(contacts)
    let allcontacts=contacts
    // ////////////////////console.log(allcontacts)
    if(project){
      let temp=[]
      allcontacts=[]
      ////////////////////console.log(contacts.length)
    for(let i=0;i<contacts.length;i++){
      temp=contacts[i].projects
      for(let j=0;j<temp.length;j++){
        // ////////////////////console.log(temp[j])
        if(temp[j].toString()==project.toString()){
          allcontacts.push(contacts[i])
        }
      }
    }
  }
    ////////////////////console.log(allcontacts)
    res.status(200).json(allcontacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
    ////////////////////console.log(req.body)
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    // //console.log(req.body)
    let contact = await Contact.findById(req.params.id);
    let files=contact.files
    // //console.log(contact)
    if(contact.files.current||(contact.files.prevlinks).length!=0){
      (files.prevlinks).push(contact.files.current)
      files.current=req.body.newurl
      req.body.files=files
      // //console.log(req.body)
      const updatedContact = await Contact.findByIdAndUpdate(contact._id,req.body,{new:true});
      res.json(updatedContact);
    }
    else{
      files.current=req.body.newurl
      req.body.files=files
      const updatedContact = await Contact.findByIdAndUpdate(contact._id,req.body,{new:true});
      res.json(updatedContact);
    }
  } catch (error) {
    //console.log(error)
    res.status(400).json({ message: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  //console.log("hi")
  try {
    let contact = await Contact.findById(req.params.id);
    //console.log(contact)
    contact.isDisabled=!contact.isDisabled
    if (contact) {
      await Contact.findByIdAndUpdate(req.params.id,contact,{new:true})
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    //////////////////console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// const deletecontacts=async(req,res)=>{
// let contact=await Contact.find()
// let contacts
// for(let i=0;i<contact.length;i++){
//   contacts=await Contact.findById(contact[i]._id)
//   contacts.isDisabled=false
//   await Contact.findByIdAndUpdate(contact[i]._id,contacts)
//   //console.log(contacts)
// }
// }
module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
