var mongoose = require("mongoose");

module.exports = mongoose.model("VoteGraphData", {
	organization : String,
	tags : [],
	graphData : [{
		day : Date,
		averageValue : Number
	}]
});