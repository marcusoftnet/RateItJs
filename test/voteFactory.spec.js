var should = require("should");
var Vote = require("../app/models/vote");
var factory = require("../app/models/voteFactory");

describe("Creating Votes from posted data", function () {
	var postData, vote;
	beforeEach(function (done) {
		postedData = {
			voteValue : 1,
			organization : "Bungsu Hospital",
			postedFrom : "192.1.1.1",
			tags : ['tag 1', 'tag 2', 'tag 3']
		};

		vote = factory.fromPostedData(postedData);
		done();
	});

	it("created an object", function (done) {
		should.exists(vote);
		done();
	});
	it("copied fields correctly", function (done) {
		vote.voteValue.should.be.equal(postedData.voteValue);
		vote.organization.should.be.equal(postedData.organization);
		vote.postedFrom.should.be.equal(postedData.postedFrom);
		vote.tags.should.containEql(postedData.tags[0]);
		vote.tags.should.containEql(postedData.tags[1]);
		vote.tags.should.containEql(postedData.tags[2]);
		done();
	});
});