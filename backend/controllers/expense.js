const Expense = require("../models/Expensemodel")
const moment = require('moment');




exports.addExpense = async (req, res) => {
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

    const income = new Expense({
        title,
        amount,
        category,
        description,
        date: formattedDate.toDate(),
        type: 'income' // Default type as specified in the schema
    });

    try {
        await income.save();
        res.status(200).json({ message: "expense added" });
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error("Validation Error:", error.message);
            res.status(400).json({ message: "Validation Error", error: error.message });
        } else {
            console.error("Server Error:", error.message);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    console.log("Expense to be added:", income); // Log the income object for debugging
};

exports.getExpense=async(req,res)=>{
    try {
        const incomes=await Expense.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({messages:'Server error'})  
    }
}

exports.deleteExpense=async(req,res)=>{
   const {id}=req.params;
   console.log(req.params)
   Expense.findByIdAndDelete(id)
     .then((income)=>{
        res.status(200).json({message:"expense deleted"})
     })
     .catch((error)=>{
        res.status(500).json({message:"server error"})
     })
}