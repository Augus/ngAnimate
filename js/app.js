Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var app = angular.module('app', ['ngAnimate']);


function AppController ($scope, $rootScope, $http, $timeout, $location, $anchorScroll) {
	$scope.list = [];
	$scope.animations = ["toggle", 
						"spinToggle", 
						"slideLeft", 
						"slideRight", 
						"slideTop", 
						"slideDown", 
						"bouncySlideLeft", 
						"bouncySlideRight", 
						"bouncySlideTop", 
						"bouncySlideDown", 
						"scaleFade", 
						"scaleFadeIn", 
						"bouncyScaleIn", 
						"flipIn", 
						"rotateIn"];

	$scope.add = function (animation) {
		$scope.animation = animation;
		for (var i = 0; i < 3; i++) {
			pushDelay($scope.list, { title : "item" }, i, 100, function() {
				$location.hash('bottom');
				$anchorScroll();
				$location.hash('');
			});
		};
	}

	$scope.remove = function (item) {
		var index = $scope.list.indexOf(item);
		$scope.list.remove(index);
	}

	$scope.clean = function () {
		for (var i = 0; i < $scope.list.length; i++) {
			removeDelay($scope.list, i, 100);
		};
	}

	function pushDelay (array, item, i, duration, cb) {
		$timeout(function () {
			array.push(item);
			cb()
		}, duration * i);
	}

	function removeDelay (array, i, duration) {
		$timeout(function () {
			array.pop();
		}, duration * i);
	}
}

