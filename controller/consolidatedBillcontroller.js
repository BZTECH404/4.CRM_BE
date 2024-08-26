// controllers/consolidatedController.js
const Consolidated = require('../models/consolidatedBill');
const Project =require('../models/projectModel')

// Create a new consolidated entry
exports.createConsolidated = async (req, res) => {
    try {
        let conso
        if(req.body.project){
        conso=await Consolidated.findOne({project:req.body.project})
        }
        if(conso){
            res.status(400).json({ message: 'Consolidated entry already exists' });
            return
        }
        const pro=await Project.findById(req.body.project)
        req.body.stage=pro.stage
        const consolidated = await Consolidated.create(req.body);
        res.status(201).json(consolidated);
    } catch (err) {
        ////console.log(err)
        res.status(400).json({ message: err.message });
    }
};

// Get all consolidated entries
exports.getAllConsolidated = async (req, res) => {
    try {
        const consolidated = await Consolidated.find({isDisabled:false})
        // ////console.log(consolidated)
        res.status(200).json(consolidated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific consolidated entry by ID
exports.getConsolidatedById = async (req, res) => {
    try {
        const consolidated = await Consolidated.findById(req.params.id).populate('project');
        if (!consolidated) {
            return res.status(404).json({ message: 'Consolidated entry not found' });
        }
        res.status(200).json(consolidated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a consolidated entry
exports.updateConsolidated = async (req, res) => {
    try {
        
        const conso1=await Consolidated.findById(req.params.id)
        ////console.log(req.body,conso1)
        if((req.body.urls).length!=0 && (conso1.urls).length!=0){
        if(req.body.urls[(req.body.urls).length-1].file!=conso1.urls[conso1.urls.length-1].file){
            let temp=[]
            for(let i=0;i<(conso1.previous).length;i++){
                temp[i]=(conso1.previous)[i]
            }
            temp.push(req.body.urls[0])
            req.body.previous=temp

        }
    }
        const consolidated = await Consolidated.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!consolidated) {
            return res.status(404).json({ message: 'Consolidated entry not found' });
        }
        res.status(200).json(consolidated);
    } catch (err) {
        ////console.log(err)
        res.status(400).json({ message: err.message });
    }
};
exports.disabledConsolidated = async (req, res) => {
        try{
            ////console.log("here")
            const consolidated = await Consolidated.findById(req.params.id);
            await consolidated.updateOne({isDisabled:true})
            await consolidated.save()
        }catch(err){
            ////console.log(err)
        }
}
// Delete a consolidated entry
exports.deleteConsolidated = async (req, res) => {
    try {
        const consolidated = await Consolidated.findByIdAndDelete(req.params.id);
        if (!consolidated) {
            return res.status(404).json({ message: 'Consolidated entry not found' });
        }
        res.status(200).json({ message: 'Consolidated entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
