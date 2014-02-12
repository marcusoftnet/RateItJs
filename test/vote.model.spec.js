var should = require("should");
var Vote = require("../app/models/vote");

describe("Vote model", function () {
	var assertRequiredFieldError = function (vote, fieldName, done) {
		vote.validate(function (err) {
			err.message.should.not.be.emtpy;
			should.exists(err.errors[fieldName]);
			done();
		});
	};

	var v;
	beforeEach(function (done) {
		v = new Vote();
		v.organization = "RS Bungsu";
		v.voteValue = 3;
		v.tags = ['tag1', 'tag2', 'tag3'];
		v.postedFrom = "192.1.1.1";
		done();
	});

	it("requires an organisation", function (done) {
		v.organization = null;
		assertRequiredFieldError(v, "organization", done);
	});
	it("requires a vote value", function (done) {
		v.voteValue = null;
		assertRequiredFieldError(v, "voteValue", done);
	});
	it("allow 1 as lowest allowed vote value", function (done) {
		v.voteValue = -1;
		assertRequiredFieldError(v, "voteValue", done);
	});
	it("allow 4 as highest allowed vote value", function (done) {
		v.voteValue = 5;
		assertRequiredFieldError(v, "voteValue", done);
	});
	it("requires a vote date", function (done) {
		v.voteDate = null;
		assertRequiredFieldError(v, "voteDate", done);
	});
	it("sets today as default vote date", function (done) {
		v.voteDate.should.not.be.emtpy;
		v.voteDate.should.eql(new Date());
		done();
	});
	it("allows an array of tags", function (done) {
		v.tags = ['tag1', 'tag2', 'tag3'];
		v.tags.length.should.equal(3);
		done();
	});
	it("requires a posted from string", function (done) {
		v.postedFrom = null;
		assertRequiredFieldError(v, "postedFrom", done);
	});
});