var Vote = require("./models/vote");
var factory = require("./models/voteFactory");

module.exports = function (app) {
	app.post("/vote", function (req, res) {
		var vote = factory.fromPostedData(req.body);
		Vote.create(vote, function (err, v) {
			if(err) res.send(err);

			res.send(201, v);
		});
	});
};