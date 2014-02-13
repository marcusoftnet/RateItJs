var should = require("should");
var request = require("supertest");
var Vote = require("../app/models/vote");

var app = require("../app.js").app;

describe("Adding votes", function () {
	beforeEach(function (done) {
		Vote.find({}).remove();
		done();
	});

	it("adds properly formatted vote", function (done) {
		var vote = {
			voteValue : 1,
			organization : "Bungsu Hospital",
			postedFrom : "192.1.1.1",
			tags : ['tag 1', 'tag 2', 'tag 3']
		};

		request(app)
			.post("/vote")
			.send(vote)
			.expect(201)
			.end(done);
	});
});