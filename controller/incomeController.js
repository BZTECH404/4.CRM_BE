// controllers/incomeController.js
const Income = require('../models/income');
const { updateInvoicebyBills } = require('../controller/invoiceController')

// Create a new income record
exports.createIncome = async (req, res) => {
    try {
        //////////////console.log(req.body)
        const income = new Income(req.body);
        await income.save();
        // await updateInvoicebyBills()
        // //////console.log("done")
        res.status(201).json({ success: true, data: income });
    } catch (error) {
        //////////////console.log(error)
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all income records
exports.getAllIncome = async (req, res) => {
    try {
        // ; if (req.body.isDisabled == undefined) {
        //     req.body.isDisabled = false
        // }
        // const incomes = await Income.find({ isDisabled: req.body.isDisabled });
        const incomes = await Income.find();

        res.status(200).json({ success: true, data: incomes });
    } catch (error) {
        //////console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single income record by ID
exports.getIncomeById = async (req, res) => {
    try {
        // Ensure the variable is correctly extracted from request parameters
        const ProjectId = req.params.projectId;
        // //////console.log(ProjectId); // Debug: Check if projectId is defined

        // If projectId is undefined, log an error message
        if (!ProjectId) {
            // ////console.error('Project ID is undefined'); // Additional debugging
            return res.status(400).json({ success: false, error: 'Project ID is required' });
        }

        // Finding all income records associated with the projectId
        const income = await Income.find({ project: ProjectId });
        // //////console.log(income); // Debug: Check the result of the query

        // If no income is found, return a 404 status with an error message
        if (income.length === 0) {
            return res.status(404).json({ success: false, error: 'No income found for this project' });
        }

        // Returning the found income records with a 200 status
        res.status(200).json({ success: true, data: income });
    } catch (error) {
        // Handling errors and returning a 500 status with the error message
        res.status(500).json({ success: false, error: error.message });
    }
};


// Update an income record by ID
exports.updateIncomeById = async (req, res) => {
    try {
        // //////////////console.log(req.body)
        let income1 = await Income.findById(req.params.id)
        ////////console.log(income1, "income1")
        ////////console.log(req.body, "req.body")
        if (income1.urls.length >= 1 && income1.urls[0].file != (req.body).urls[0].file) {
            // ////////console.log("changed payment proof")
            income1.previous.push({ name: "Payment Proof", file: income1.urls[0].file })

        }
        if (income1.urls.length >= 2 && income1.urls[1].file != (req.body).urls[1].file) {
            // ////////console.log("changed tax invoice proof")
            income1.previous.push({ name: "Tax Invoice", file: income1.urls[1].file })

        }
        (req.body).previous = income1.previous
        const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!income) {
            return res.status(404).json({ success: false, error: 'Income not found' });
        }
        await updateInvoicebyBills()
        ////////console.log("done")
        res.status(200).json({ success: true, data: income });
    } catch (error) {
        ////////console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete an income record by ID
exports.deleteIncomeById = async (req, res) => {
    try {
        // const income = await Income.findByIdAndDelete(req.params.id);
        let income1 = await Income.findById(req.params.id)
        let deletetimesarr=income1.deletedtimes
        //console.log(deletetimesarr)
        deletetimesarr.push(Date.now())
        const income = await Income.findByIdAndUpdate(req.params.id, { isDisabled: !income1.isDisabled,
            deletedtimes:deletetimesarr
        })
        // //////////////console.log(income1)
        if (!income) {
            return res.status(404).json({ success: false, error: 'Income not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
