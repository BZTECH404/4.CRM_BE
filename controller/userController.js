// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




async function createUser(req, res) {
  const { username, email, password,role } = req.body;
  ////////////////console.log(req.body);
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role: role?role:"user" // Default role
    });

    // Generate JWT token
    const token = jwt.sign({ userId: createdUser._id,username, role:'user' }, 'your_secret_key', {
      expiresIn: '1h' // Token expires in 1 hour
    });

    res.json({ message: 'User created successfully', user: createdUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
      // Find the user by username
      const user = await User.findOne({ username });

      // If user is not found, return an error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If passwords don't match, return an error
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id,username, role:user.role }, 'your_secret_key', {
        expiresIn: '1h' // Token expires in 1 hour
      });
      // //////////console.log(token)
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  const id = req.params.id;
  const newData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
    if (updatedUser) {
      res.json({ message: 'User updated successfully', user: updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function checkloginvalidity(req,res){
try{
  res.json({ data:true });

}
catch(err){
  res.status(500).json({ data:false,error: err.message });

}

}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkloginvalidity
};
