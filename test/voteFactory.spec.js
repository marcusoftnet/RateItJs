var should = require("should");
var Vote = require("../app/models/vote");
var factory = require("../app/models/voteFactory");

describe("Creating Votes from posted data", function () {
	var postData, vote, req;
	beforeEach(function (done) {
		postedData = {
			voteValue : 1,
			organization : "Bungsu Hospital",
			tags : ['tag 1', 'tag 2', 'tag 3']
		};

		req = { ip : "192.1.1.1"};

		vote = factory.fromPostedData(postedData, req);
		done();
	});

	it("created an object", function (done) {
		should.exists(vote);
		done();
	});
	it("copied fields correctly", function (done) {
		vote.voteValue.should.be.equal(postedData.voteValue);
		vote.organization.should.be.equal(postedData.organization);
		vote.postedFrom.should.be.equal(req.ip);
		vote.tags.should.containEql(postedData.tags[0]);
		vote.tags.should.containEql(postedData.tags[1]);
		vote.tags.should.containEql(postedData.tags[2]);
		done();
	});
	it("created default values", function (done) {
		vote.voteDate.should.not.be.emtpy;
		done();
	});
});