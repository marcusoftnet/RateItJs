var mongoose = require("mongoose");

var voteSchema = mongoose.Schema({
	voteValue : Number,
	organization : String,
	voteDate:  Date,
	tags : [String],
	postedFrom : String
});

module.exports = mongoose.model("Vote", voteSchema);