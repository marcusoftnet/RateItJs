var Vote = require("./vote");

module.exports.fromPostedData = function (postedData, req) {
	var v = new Vote();
	v.voteValue = postedData.voteValue;
	v.organization = postedData.organization;
	v.tags = postedData.tags;

	v.voteDate = new Date();
	v.postedFrom = req.ip;
	return v;
};