const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  pincode: { type: String, required: true },
  message: { type: String },
  read: { type: Boolean },
  admin_read: { type: Boolean },
  date: { type: Date, default: new Date() },
  branchId: { type: mongoose.Types.ObjectId, ref: 'branches' },
});

module.exports = mongoose.model('notifications', notificationSchema);
