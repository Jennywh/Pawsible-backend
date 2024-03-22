const userProfile = require('./endpoints/userProfile');
const petSittingRequest = require('./endpoints/petSittingRequest');

exports.getProfile = userProfile.getProfile;
exports.createOrUpdateProfile = userProfile.createOrUpdateProfile;
exports.getRequests = petSittingRequest.getRequests;
exports.addRequest = petSittingRequest.addRequest;