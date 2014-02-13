var Vote = require("./vote");

module.exports.fromPostedData = function (postedData) {
	var v = new Vote();
	v.voteValue = postedData.voteValue;
	v.organization = postedData.organization;
	v.postedFrom = postedData.postedFrom;
	v.tags = postedData.tags;
	return v;
};