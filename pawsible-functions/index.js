const userProfile = require('./endpoints/userProfile');
const petSittingRequest = require('./endpoints/petSittingRequest');

exports.getProfile = userProfile.getProfile;
exports.getRequests = petSittingRequest.getRequests;
exports.addRequest = petSittingRequest.addRequest;