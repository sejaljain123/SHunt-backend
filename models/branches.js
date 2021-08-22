const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  institution: { type: String, required: true },
  branchName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  contact: [{ type: String }],
  incharge: { type: String, required: true },
  pincode: [{ type: String, required: true }],
  user_type: { type: String, required: false },
});

module.exports = mongoose.model('branches', branchSchema);
