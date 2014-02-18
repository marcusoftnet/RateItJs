angular.module("voteController", ["voteService"])

	// inject the Todo service factory into our controller
	.controller("voteController", function($scope, $http, Votes) {
		$scope.voteData = {
			organization : "RSBungsu",
			tags : "tag1,tag1,tag2,tag3"
		};

		$scope.addVote = function() {
			console.log($scope.voteData);
			// validate the formData to make sure that something is there
			if (!$.isEmptyObject($scope.voteData)) {
				Votes.addVote($scope.voteData)
					.success(function(data) {
						$scope.voteData.voteValue = 0; 
						$('.voteValue').prop('checked', false);
						$scope.latestVote = data;
					});
			}
		};

		$scope.dayAverage = function() {
			Todos.dayAverage()
				.success(function(data) {
					$scope.dayAverageData = data; // assign our new list of todos
				});
		};
	});