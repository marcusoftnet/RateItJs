var Vote = require("./models/vote");
var factory = require("./models/voteFactory");

module.exports = function (app) {
	app.post("/vote", function (req, res) {
		var vote = factory.fromPostedData(req.body, req);

		console.log(vote);

		Vote.create(vote, function (err, v) {
			if(err) res.send(400, err);

			res.send(201);
		});
	});
};