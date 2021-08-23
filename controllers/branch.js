const Branch = require('../models/branches');

const getAllBranches = async (req, res) => {
  try {
    const data = await Branch.find({ pincode: { $in: [req.body.pincode] } });
    return res.json(data);
  } catch (e) {
    console.log(e);
  }
};

const listBranches = async (req, res) => {
  try {
    if ((req.decodedToken.type = undefined || null))
      return res.status(403).json({ message: 'Unauthorized' });
    const data = await Branch.find({ username: { $ne: 'admin' } });
    data.forEach((i) => {
      delete i.username;
      delete i.password;
    });
    return res.json(data);
  } catch (e) {
    console.log(e);
  }
};

const userBranch = async (req, res) => {
  try {
    // console.log(req.decodedToken);
    const data = await Branch.find({ _id: req.decodedToken.userId });
    data.forEach((i) => {
      delete i.username;
      delete i.password;
    });
    return res.json(data);
  } catch (e) {
    console.log(e);
  }
};

const searchBranch = async (req, res) => {
  try {
    const { branch } = req.query;
    const data = await Branch.find({ branchName: new RegExp(`${branch}`, 'gi') });
    return res.json(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllBranches,
  listBranches,
  userBranch,
  searchBranch,
};
