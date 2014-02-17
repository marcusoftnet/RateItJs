var should = require("should");
var request = require("supertest");
var Vote = require("../app/models/vote.js");
var app = require("../app.js").app;

describe("Getting the day average report", function () {
	var requestData = {
		organization : "RSBungsu",
		tags : "tag 1,tag 2,tag 3",
		dateFrom : new Date("2014-01-01"),
		dateTo : new Date("2014-01-31")
	};

	function createVote(vote){
		Vote.create(vote, function (err, v) {
			if(err) done(err);

			return v;
		});
	}

	function createTestData() {
		for(var i = 0; i < 10; i++){
			createVote({
				voteValue : 4,
				voteDate : new Date("2014-01-"+(i +2)),
				organization : "RSBungsu",
				tags : ["tag 1", "tag 2", "tag 3"],
				postedFrom : "127.0.0.1"
			});
		}

		// Create one vote that stands out
		createVote({
			voteValue : 1,
			voteDate : new Date("2010-01-01"),
			organization : "Yayasan",
			tags : ["tag 4", "tag 5"],
			postedFrom : "127.0.0.1"
		});
	}

	before(function (done) {
		Vote.find({}).remove();
		createTestData();
		done();
	});

	after(function (done) {
		Vote.find({}).remove();
		done();
	});

	it("returns the correct number of graph rows", function (done) {
		request(app)
			.post("/votes/dayAverage")
			.send(requestData)
			.expect(200)
			.expect(function (res) {
				result = JSON.parse(res.text);
				result.graphData.length.should.equal(10);
			})
			.end(done);
	});
	it("returns the correct data regarding organization", function (done) {
		request(app)
			.post("/votes/dayAverage")
			.send(requestData)
			.expect(200)
			.expect(function (res) {
				result = JSON.parse(res.text);
				result.organization.should.equal("RSBungsu");
			})
			.end(done);
	});
	it("returns the correct data regarding tags", function (done) {
		request(app)
			.post("/votes/dayAverage")
			.send(requestData)
			.expect(200)
			.expect(function (res) {
				result = JSON.parse(res.text);
				result.tags.length.should.equal(3);
			})
			.end(done);
	});
	it("returns the correct data regarding dates", function (done) {
		request(app)
			.post("/votes/dayAverage")
			.send(requestData)
			.expect(200)
			.expect(function (res) {
				result = JSON.parse(res.text);
				for (var i = 0; i < result.graphData.length; i++) {
					result.graphData.should.be.less(new Date("2014-01-31"));
					result.graphData.should.be.more(new Date("2014-01-01"));
				}
				result.voteDate.length.should.equal(3);
			})
			.end(done);
	});

});

