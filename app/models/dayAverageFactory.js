module.exports.transform = function (rawData) {
	var averageDayReport = {
		organization : rawData[0].organization,
		tags : rawData[0].tags,
		graphData : []
	};

	for (var i = 0; i < rawData.length; i++) {
		averageDayReport.graphData.push({
			date : rawData[i].voteDate,
			voteValue : rawData[i].voteValue
		});
	}

	return averageDayReport;
};