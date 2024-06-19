const Income = require("../models/incomemodel")
const moment = require('moment');




exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    // Check for missing fields
    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if amount is a positive number
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Amount should be a positive number" });
    }
    const formattedDate = moment(date, 'DD-MM-YYYY', true);
    if (!formattedDate.isValid()) {
        return res.status(400).json({ message: "Invalid date format. Use 'DD-MM-YYYY'" });
    }

    const income = new Income({
        title,
        amount,
        category,
        description,
        date: formattedDate.toDate(),
        type: 'income' // Default type as specified in the schema
    });

    try {
        await income.save();
        res.status(200).json({ message: "Income added" });
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error("Validation Error:", error.message);
            res.status(400).json({ message: "Validation Error", error: error.message });
        } else {
            console.error("Server Error:", error.message);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    console.log("Income to be added:", income); // Log the income object for debugging
};

exports.getIncomes=async(req,res)=>{
    try {
        const incomes=await Income.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({messages:'Server error'})  
    }
}

exports.deleteIncome=async(req,res)=>{
   const {id}=req.params;
   console.log(req.params)
   Income.findByIdAndDelete(id)
     .then((income)=>{
        res.status(200).json({message:"Income deleted"})
     })
     .catch((error)=>{
        res.status(500).json({message:"server error"})
     })
}