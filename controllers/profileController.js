const User = require("../models/User");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("name email");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = { getProfile };
