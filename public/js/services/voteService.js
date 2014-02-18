angular.module("voteService", [])

	// each function returns a promise object
	.factory("Votes", function($http) {
		return {
			addVote : function(voteData) {
				console.log(voteData);

				return $http.post("/vote", voteData);
			},
			dayAverage : function(queryData) {
				return $http.post("/votes/dayAverage", queryData);
			}
		};
	});