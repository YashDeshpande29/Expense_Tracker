const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../models/User')

const router=require('express').Router();

router.post('/add-income',addIncome)
router.get('/get-incomes',getIncomes)
      .delete('/delete-income/:id',deleteIncome)
      .post('/add-expense',addExpense)
      .get('/get-expenses',getExpense)
      .delete('/delete-expense/:id',deleteExpense)
      
      // Register Route
      router.post('/register', async (req, res) => {
          const { username, email, password } = req.body;
          try {
              let user = await User.findOne({ email });
              if (user) return res.status(400).json({ msg: 'User already exists' });
      
              user = new User({ username, email, password });
              await user.save();
      
              const payload = { user: { id: user.id } };
              jwt.sign(payload, 'yourSecretKey', { expiresIn: 360000 }, (err, token) => {
                  if (err) throw err;
                  res.json({ token });
              });
          } catch (err) {
              console.error(err.message);
              res.status(500).send('Server error');
          }
      });
      
      // Login Route
      router.post('/login', async (req, res) => {
          const { email, password } = req.body;
          try {
              let user = await User.findOne({ email });
              if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
      
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
      
              const payload = { user: { id: user.id } };
              jwt.sign(payload, 'yourSecretKey', { expiresIn: 360000 }, (err, token) => {
                  if (err) throw err;
                  res.json({ token });
              });
          } catch (err) {
              console.error(err.message);
              res.status(500).send('Server error');
          }
      });
  
module.exports=router