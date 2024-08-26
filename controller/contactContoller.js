const Contact = require('../models/contactModel');
// Controller functions

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const {project,type}=req.body
    //////////////console.log(req.body)
    const projectfilter={}
    if(type){
      projectfilter.type=type
    }
    //////////////console.log(projectfilter)
    const contacts = await Contact.find(projectfilter);
    let allcontacts=contacts
    // //////////////console.log(allcontacts)
    if(project){
      let temp=[]
      allcontacts=[]
      //////////////console.log(contacts.length)
    for(let i=0;i<contacts.length;i++){
      temp=contacts[i].projects
      for(let j=0;j<temp.length;j++){
        // //////////////console.log(temp[j])
        if(temp[j].toString()==project.toString()){
          allcontacts.push(contacts[i])
        }
      }
    }
  }
    //////////////console.log(allcontacts)
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
    //////////////console.log(req.body)
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
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      contact.set(req.body);
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    //////////console.log("hi")
    const contact = await Contact.findById(req.params.id);
    // ////////////console.log(contact)
    if (contact) {
      await Contact.findByIdAndDelete(req.params.id)
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    ////////////console.log(error)
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
