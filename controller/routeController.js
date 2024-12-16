const User = require('../models/userModel'); // Adjust the path if needed

// Add new paths to all users if they don't already exist
exports.addPathsToAllUsers = async (req, res) => {
  const { newPaths } = req.body;

  //console.log(newPaths)
  if (!newPaths || typeof newPaths !== 'object') {
    return res.status(400).json({ message: 'Invalid paths format' });
  }

  try {
    // Fetch all users
    const users = await User.find();

    // Iterate over each user
    for (const user of users) {
      // Initialize paths if it doesn't exist on user
      user.paths = user.paths || {};

    //   // Iterate over new paths and add only if not already present
      for (const [key, value] of Object.entries(newPaths)) {
        if (!user.paths[key]) {
          user.paths[key] = { ...value, isActive: value.isActive !== undefined ? value.isActive : false };
        }
      }
      //console.log(user,user.paths)

      await User.findByIdAndUpdate(user._id,user); // Save the user after adding new paths
    }

    res.status(200).json({ message: 'New paths added to all users where needed' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating paths for users', error });
  }
};


// Toggle isActive for a specified path in a user's paths
  exports.togglePathIsActive = async (req, res) => {
    const { userId } = req.params;
    const { paths } = req.body;
  
    if (!paths || typeof paths !== 'object') {
      return res.status(400).json({ message: 'Invalid paths format' });
    }
  
    try {
      // Find and update the user's paths
      const user = await User.findByIdAndUpdate(
        userId,
        { paths },
        { new: true, runValidators: true } // Returns updated user document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User paths updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user paths', error });
    }
  };

  // Check if a specific path exists in a user's paths
exports.checkUserPath = async (req, res) => {
  //console.log("hi")
  // const { userId } = req.params; // Extract user ID from URL parameters
  const { path } = req.body; // Extract path from the request body
  // if (!path || typeof path !== 'string') {
  //   return res.status(400).json({ message: 'Invalid or missing path' });
  // }

  try {
    // Find the user by ID
    // const user = await User.findById(userId);

    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // // Check if the path exists in the user's paths
    // const pathEntry = Object.entries(user.paths).find(
    //   ([key, value]) => value.path === path
    // );

    // if (!pathEntry) {
    //   return res.status(404).json({ message: 'Path not found in user paths' });
    // }

    // Return the key and value of the matched path
    // const [key, value] = pathEntry;
    res.status(200).json({
      message: 'Path found',
    });
  } catch (error) {
    //console.log(error)
    res.status(500).json({ message: 'Error checking user path', error });
  }
};
