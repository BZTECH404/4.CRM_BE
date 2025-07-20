const FileTemplate = require('../models/filetemplatemodel'); // Adjust path as needed

const createFileTemplate = async (req, res) => {
  try {
    console.log(req.body)
    const fileTemplatecheck = await FileTemplate.find({name:req.body.name,type:req.body.type});
    if(fileTemplatecheck.length!=0){
        //console.log(fileTemplatecheck)
        res.status(400).json({ message: 'File template already exists' });
        return
    }
    const fileTemplate = await FileTemplate.create({name:req.body.name,type:req.body.type,html:req.body.rawHtml,inputValues:req.body.inputValues});
    res.status(201).json({ fileTemplate });
  } catch (err) {
    //console.log(err)
    res.status(400).json({ message: err.message });
  }
};

const getAllFileTemplates = async (req, res) => {
  try {
    const fileTemplates = await FileTemplate.find();
    res.status(200).json({ fileTemplates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFileTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const fileTemplate = await FileTemplate.findById(id);

    if (!fileTemplate) {
      return res.status(404).json({ message: 'File template not found' });
    }

    res.status(200).json({ fileTemplate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFileTemplate = async (req, res) => {
  try {
    console.log(req.body)
    const { id } = req.params;
    const updatedFileTemplate = await FileTemplate.findByIdAndUpdate(
      id,{
      name:req.body.name,
      type:req.body.type,
      html:req.body.rawHtml,
      inputValues:req.body.inputValues},
      { new: true } // Return the updated document
    );

    if (!updatedFileTemplate) {
      return res.status(404).json({ message: 'File template not found' });
    }

    res.status(200).json({ updatedFileTemplate });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFileTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFileTemplate = await FileTemplate.findByIdAndDelete(id);

    if (!deletedFileTemplate) {
      return res.status(404).json({ message: 'File template not found' });
    }

    res.status(200).json({ message: 'File template deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createFileTemplate,
  getAllFileTemplates,
  getFileTemplateById,
  updateFileTemplate,
  deleteFileTemplate,
};
