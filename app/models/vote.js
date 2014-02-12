var mongoose = require("mongoose");

module.exports = mongoose.model("Vote", {
	voteValue : { type: Number, min: 1, max: 4, required : true },
	organization : { type: String, required : true},
	voteDate: { type: Date, default: Date.now , required : true },
	tags : [],
	postedFrom : { type: String, required : true }
});