var Vote = require("./models/vote");
var factory = require("./models/voteFactory");
var DayAverageFactory = require("../app/models/dayAverageFactory");


module.exports = function (app) {
	app.post("/vote", function (req, res) {
		var vote = factory.fromPostedData(req.body, req);

		Vote.create(vote, function (err, v) {
			if(err) res.send(400, err);

			res.location("/vote/" + v._id);
			res.json(201, v);
		});
	});

	app.post("/votes/dayAverage", function (req, res) {
		var data;
		Vote
			.find({organization: req.body.organization})
			.where("tags").all(req.body.tags.split(","))
			.where("voteDate")
				.gt(new Date(req.body.dateFrom))
				.lt(new Date(req.body.dateTo))
			.exec(function (err, docs) {
				if(err) res.send(400, err);
				res.json(200, DayAverageFactory.transform(docs));
			});
	});
};