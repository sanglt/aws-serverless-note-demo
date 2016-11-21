var nodeApp = angular.module('nodeApp', []);

nodeApp.controller('mainController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
  $scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('https://ooxygb6g0h.execute-api.us-east-1.amazonaws.com/dev/notes')
		.success(function(data) {
			$scope.notes = data.body;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createNote = function() {
		$http.post('https://ooxygb6g0h.execute-api.us-east-1.amazonaws.com/dev/notes', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.notes.push(data.body);
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteNote = function(note) {
		$http.delete('https://ooxygb6g0h.execute-api.us-east-1.amazonaws.com/dev/notes/' + note.title)
			.success(function(data) {
				var index = $scope.notes.indexOf(note);
        $scope.notes.splice(index, 1);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}]);
