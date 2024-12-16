const Template = require('../models/templatemodel');


exports.createTemplate = async (req, res) => {
  try {
    //console.log('hi')
    //console.log(req.body)
    let {elements}=req.body
    // //console.log(elements)
    const template = await Template.create(req.body)   // await template.save();
    //console.log(template)
    res.status(201).json({ template });
  } catch (error) {
    res.status(400).json({ message: 'Error creating template', error });
  }
};


exports.getAllTemplates = async (req, res) => {
  try {
    //console.log(req.body)
    const templates = await Template.find({_id:req.body._id});
    //console.log(templates)
    res.status(200).json({ templates });
  } catch (error) {
    // //console.log(error)
    res.status(500).json({ message: 'Error getting templates', error });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ template });
  } catch (error) {
    res.status(500).json({ message: 'Error getting template', error });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ template });
  } catch (error) {
    res.status(500).json({ message: 'Error updating template', error });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndRemove(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    if (template.image) {
      await deleteFile(template.image);
    }
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting template', error });
  }
};
