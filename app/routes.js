var Vote = require("./models/vote");
var factory = require("./models/voteFactory");

module.exports = function (app) {
	app.post("/vote", function (req, res) {
		var vote = factory.fromPostedData(req.body, req);

		Vote.create(vote, function (err, v) {
			if(err) res.send(400, err);

			res.location("/vote/" + v._id);
			res.json(201, v);
		});
	});
};