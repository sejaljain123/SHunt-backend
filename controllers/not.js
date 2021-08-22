const Notify = require('../models/notification');
require('../models/branches');

const getNotifications = async (req, res) => {
  const data = await Notify.find({ branchId: req.decodedToken.userId }).sort({ date: -1 });
  console.log(data);
  res.json(data);
  for await (element of data) {
    element.read = true;
    await element.save();
  }
};

const adminNotifications = async (req, res) => {
  const data = await Notify.find({}).sort({ date: -1 }).populate('branchId');
  console.log(data);
  res.json(data);
  for await (element of data) {
    element.admin_read = true;
    await element.save();
  }
};

module.exports = {
  getNotifications,
  adminNotifications,
};
