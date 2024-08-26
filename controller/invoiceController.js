const Invoice = require('../models/invoice');
const Income = require('../models/income');
// Controller function to create a new invoice
const createInvoice = async (req, res) => {
    ////////console.log(req.body)
    try {
        const savedInvoice = await Invoice.create(req.body);
        res.status(201).json(savedInvoice);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all invoices
const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({isDisabled:false});
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a single invoice by ID
const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update an existing invoice
const updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete an invoice
const deleteInvoice = async (req, res) => {
    try {
        const invoice1=await Invoice.findById(req.params.id)
        const deletedInvoice = await Invoice.findByIdAndUpdate(req.params.id,{isDisabled:!invoice1.isDisabled})
        if (!deletedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update 
const updateInvoicebyBills =async(req,res)=>{
    try{
        const allbills=await Income.find()
        obj={}
        // Calculating Amount Paid by Iterating thorugh Bills
        for(let i=0;i<allbills.length;i++){
            // ////////console.log(allbills[i])
            if(allbills[i].invoice){
            if(obj[allbills[i].invoice]==undefined){
                obj[allbills[i].invoice]=allbills[i].amount
            }
            else{
                obj[allbills[i].invoice]+=allbills[i].amount
            }
        }
    }
    ////////console.log(obj)
        res.status(200).json({message:"hello"})
        const allinvoices=await Invoice.find()
        for(let i=0;i<allinvoices.length;i++){
            // ////////console.log(allbills[i])
            await Invoice.findByIdAndUpdate(allinvoices[i]._id,{amount_paid:obj[(allinvoices[i]._id).toString()]})
        }


    }
    catch{

    }


}


module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    updateInvoicebyBills
};
