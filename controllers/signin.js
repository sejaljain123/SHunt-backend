const User = require('../models/branches');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleSignin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ success: false, message: 'invalid username' });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        const token = jwt.sign({ userId: user._id, type: user.user_type }, process.env.SECRET_KEY);
        delete user.password;
        return res.json({
          success: true,
          user,
          message: 'login successfull',
          token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: 'Error' });
  }
};

module.exports = {
  handleSignin,
};
