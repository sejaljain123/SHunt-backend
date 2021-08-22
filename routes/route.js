const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const signin = require('../controllers/signin');
const branch = require('../controllers/branch');
const notify = require('../controllers/not');

router.post('/signin', signin.handleSignin);
router.post('/listbranches', branch.getAllBranches);
router.get('/listallbranches', auth, branch.listBranches);
router.get('/branch', auth, branch.userBranch);
router.get('/notifications', auth, notify.getNotifications);
router.get('/adminnotifications', auth, notify.adminNotifications);

module.exports = router;
