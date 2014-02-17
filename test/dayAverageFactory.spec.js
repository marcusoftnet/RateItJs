var should = require("should");
var DayAverageFactory = require("../app/models/dayAverageFactory");

describe("Converting raw data to dayAverage report", function () {
	var converted;
	var rawData = [{
        "_id": "52ff79caac4a440828000001",
        "voteValue": 1,
        "organization": "Rumah Sakit Bungsu",
        "voteDate": "2014-02-15T14:29:30.325Z",
        "postedFrom": "127.0.0.1",
        "__v": 0,
        "tags": [
            "tag 1",
            "tag 2",
            "tag 3"
        ]},
		{
        "_id": "52ff79caac4a440828000002",
        "voteValue": 1,
        "organization": "Rumah Sakit Bungsu",
        "voteDate": "2014-02-15T14:29:30.352Z",
        "postedFrom": "127.0.0.1",
        "__v": 0,
        "tags": [
            "tag 1",
            "tag 2",
            "tag 3"
        ]}
    ];

    beforeEach(function (done) {
		converted = DayAverageFactory.transform(rawData);
		done();
    });

    it("doesn't fail", function (done) {
		should.exists(converted);
		done();
    });
    it("converts organization", function (done) {
		converted.organization.should.equal(rawData[0].organization);
		done();
    });
    it("converts tags", function (done) {
		converted.tags.should.equal(rawData[0].tags);
		done();
    });
    it("creates the correct number of rows", function (done) {
		converted.graphData.length.should.equal(rawData.length);
		done();
    });
});

describe("Converting errornous raw data to dayAverage report", function () {
    it("returns an empty report for empty array", function (done) {
        var converted = DayAverageFactory.transform([]);
        converted.should.eql([]);
        done();
    });
});