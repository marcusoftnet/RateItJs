var should = require("should");
var request = require("supertest");
var Vote = require("../app/models/vote.js");
var app = require("../app.js").app;

describe("Adding votes", function () {
	var vote = {
		voteValue : 1,
		organization : "Rumah Sakit Bungsu",
		tags : "tag 1,tag 2,tag 3"
	};

	beforeEach(function (done) {
		//Vote.find({}).remove();
		done();
	});

	after(function (done) {
		//Vote.find({}).remove();
		done();
	});

	function idIsSet (res) {
		res.headers.location.should.startWith("/vote/");

		// TODO Fix proper regexp validation
		// console.log(res.headers.location);
		// ^[0-9a-fA-F]{24}$/
	}

	function voteDataIsReturned (res) {
		res.text.should.not.be.empty;
		var createdVote = JSON.parse(res.text);
		createdVote.voteValue.should.be.equal(vote.voteValue);
		createdVote.organization.should.be.equal(vote.organization);

		createdVote.tags.length.should.equal(3);
		createdVote.tags.should.containEql("tag 1");
		createdVote.tags.should.containEql("tag 2");
		createdVote.tags.should.containEql("tag 3");

		createdVote.postedFrom.should.be.equal("127.0.0.1");
		createdVote.voteDate.should.not.be.empty;
	}

	it("adds the vote in the database", function (done) {
		request(app)
			.post("/vote")
			.send(vote)
			.expect(201)
			.end(done);
	});
	it("returns the id of the vote", function (done) {
		request(app)
			.post("/vote")
			.send(vote)
			.expect(idIsSet)
			.end(done);
	});
	it("returns the vote data", function (done) {
		request(app)
			.post("/vote")
			.send(vote)
			.expect(voteDataIsReturned)
			.end(done);
	});
});