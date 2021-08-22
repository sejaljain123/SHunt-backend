// const Mongoose = require('mongoose');
const Branch = require('./models/branches');
const data = require('./beetleNut.json');
const bcrypt = require('bcrypt');

const insertData = async () => {
  var i = 1;
  for await (dat of data) {
    let contact = dat['Contact Number'].split(',');
    let pincode = dat['Pincode covered'].split(',');
    let username = dat['Branch Name'];
    let password = bcrypt.hashSync(dat['Branch Name'], 10);
    await Branch.create({
      username,
      password,
      institution: dat['Insitution Name'],
      branchName: dat['Branch Name'],
      address: dat['Address'],
      city: dat['City'],
      contact,
      incharge: dat['Branch Incharge'],
      pincode,
    });
    console.log('created', i);
    i++;
  }
};

module.exports = {
  insertData,
};
